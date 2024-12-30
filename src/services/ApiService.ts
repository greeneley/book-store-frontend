import axios from "axios";
import API from "../constants";
import { TokenService } from "./TokenService";

const baseURL = API.dev;

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
const subscribeTokenRefresh = (callback: any) => {
	refreshSubscribers.push(callback);
};

const onTokenRefreshComplete = (newToken: string): void => {
	refreshSubscribers.forEach((callback) => callback(newToken));
	refreshSubscribers = [];
};

const onTokenRefreshError = (error: Error): Promise<never> => {
	refreshSubscribers = [];
	return Promise.reject(error);
};

const instance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json"
	}
});

instance.interceptors.request.use(
	(config) => {
		const token = TokenService.getLocalAccessToken();
		if (token) {
			config.headers["Authorization"] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const originalConfig = err.config;
		if (err.response) {
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;
				if (isRefreshing) {
					try {
						return new Promise((resolve, reject) => {
							subscribeTokenRefresh((newToken: string) => {
								if (originalConfig.headers) {
									originalConfig.headers.Authorization = `Bearer ${newToken}`;
								}
								resolve(instance(originalConfig));
							});
						});
					} catch (err) {
						return Promise.reject(err);
					}
				}
				isRefreshing = true;
				try {
					const refreshToken = TokenService.getLocalRefreshToken();
					const user = TokenService.getUser();

					if (!refreshToken || !user) {
						throw new Error("No refresh token or user data");
					}

					const response = await instance.post("/api/v1/auth/refresh-token", {
						refreshToken,
						id: user._id
					});

					const { accessToken, refreshToken: newRefreshToken } = response.data;
					console.log({ accessToken });
					TokenService.updateLocalAccessToken(accessToken);
					TokenService.updateLocalRefreshToken(newRefreshToken);

					onTokenRefreshComplete(accessToken);
					isRefreshing = false;
					return instance(originalConfig);
				} catch (err) {
					isRefreshing = false;
					await onTokenRefreshError(err as Error);

					return Promise.reject(err);
				}
			}
		}
		return Promise.reject(err);
	}
);

export default instance;
