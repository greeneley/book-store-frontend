import { useAuth } from "@/contexts/AuthContextProvider";
import { HomePage } from "@/pages/HomePage";
import { Login } from "@/pages/Login";
import { MainLayout } from "@/pages/MainLayout";
import { SignUp } from "@/pages/SignUp";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

export const Routes = () => {
	const { token } = useAuth();

	const publicRoutes = [
		{
			path: "/",
			element: <MainLayout />,
			children: [
				{
					path: "/login",
					element: <Login />
				},
				{
					path: "/signup",
					element: <SignUp />
				},
				{
					path: "/home",
					element: <HomePage />
				},
				{
					path: "/",
					element: <Navigate to={"/home"} />
				}
			]
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
