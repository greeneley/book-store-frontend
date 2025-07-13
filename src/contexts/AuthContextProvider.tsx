import { isUser, User } from "@/model/internal/user";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

type AuthContextValue = {
	accessToken: string | null;
	setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
	refreshToken: string | null;
	setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthProviderProps = {
	children?: React.ReactNode;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
	const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
	const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem("user");
		if (!storedUser) return null;

		try {
			const parsedUser = JSON.parse(storedUser);
			return isUser(parsedUser) ? parsedUser : null;
		} catch {
			return null;
		}
	});

	React.useEffect(() => {
		if (accessToken && refreshToken) {
			axios.defaults.headers["Authorization"] = accessToken;
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

	const contextValue: AuthContextValue = {
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
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
