export class TokenService {
	static getLocalAccessToken() {
		return localStorage.getItem("accessToken");
	}

	static getLocalRefreshToken() {
		return localStorage.getItem("refreshToken");
	}

	static getUser() {
		return JSON.parse(localStorage.getItem("user"));
	}

	static updateLocalAccessToken(token: string) {
		localStorage.setItem("accessToken", token);
	}

	staticupdateLocalRefreshToken(token: string) {
		localStorage.setItem("refreshToken", token);
	}
}
