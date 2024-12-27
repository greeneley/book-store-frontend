import axios from "axios";
import API from "../constants";
import { TokenService } from "./TokenService";

const baseURL = API.dev;
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
	}
);

export default instance;
