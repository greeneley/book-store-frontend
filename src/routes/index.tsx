import { CheckYourEmail } from "@/pages/Authentication/CheckYourEmail";
import { EmailVerified } from "@/pages/Authentication/EmailVerified";
import { ForgotPassword } from "@/pages/Authentication/ForgotPassword";
import { Login } from "@/pages/Authentication/Login";
import { PasswordUpdated } from "@/pages/Authentication/PasswordUpdated";
import { ResetPassword } from "@/pages/Authentication/ResetPassword";
import { SignUp } from "@/pages/Authentication/SignUp";
import { HomePage } from "@/pages/HomePage";
import { MainLayout } from "@/pages/MainLayout";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

export const Routes = () => {
	const routesForAuthentication = [
		{
			path: "/check-email",
			element: <CheckYourEmail />
		},
		{
			path: "/verify",
			element: <EmailVerified />
		},
		{
			path: "/forgot-password",
			element: <ForgotPassword />
		},
		{
			path: "/reset-password",
			element: <ResetPassword />
		},
		{
			path: "/password-updated",
			element: <PasswordUpdated />
		}
	];

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
				},
				...routesForAuthentication
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
