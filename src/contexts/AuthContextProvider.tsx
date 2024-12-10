import { User } from "@/model/internal/user";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

type AuthContextValue = {
	accessToken: string;
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
	refreshToken: string;
	setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
	user: unknown;
	setUser: React.Dispatch<React.SetStateAction<User>>;
};

type AuthProviderProps = {
	children?: React.ReactNode;
};

export const AuthContext = createContext<AuthContextValue>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
	const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
	const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
	const [user, setUser] = useState<unknown>(JSON.parse(localStorage.getItem("user")));

	React.useEffect(() => {
		if (accessToken && refreshToken) {
			axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);
		} else {
			delete axios.defaults.headers.common["Authorization"];
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		}
	}, [accessToken, refreshToken]);

	React.useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		}
	}, [user]);

	const contextValue = {
		accessToken,
		setAccessToken,
		refreshToken,
		setRefreshToken,
		user,
		setUser
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
