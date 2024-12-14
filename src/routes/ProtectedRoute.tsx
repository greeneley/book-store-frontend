import { useAuth } from "@/contexts/AuthContextProvider";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
	const { accessToken } = useAuth();

	if (!accessToken) {
		return <Navigate to={"/login"} />;
	}

	return <Outlet />;
};
