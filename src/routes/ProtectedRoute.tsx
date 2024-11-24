import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

export const ProtectedRoute = () => {
	const { accessToken } = useAuth();

	if (!accessToken) {
		return <Navigate to={"/login"} />;
	}

	return <Outlet />;
};
