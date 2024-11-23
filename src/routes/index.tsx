import { useAuth } from "@/contexts/AuthContextProvider";
import { MainLayout } from "@/pages/MainLayout";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

export const Routes = () => {
	const { token } = useAuth();

	const publicRoutes = [
		{
			path: "/",
			element: <MainLayout />
		}
	];

	const routesForAuthenticated = [
		{
			path: "/",
			element: (
				<MainLayout>
					<ProtectedRoute />
				</MainLayout>
			)
		}
	];

	const router = createBrowserRouter([...publicRoutes, ...routesForAuthenticated]);

	return <RouterProvider router={router} />;
};
