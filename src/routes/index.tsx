import React from 'react';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { BookDetail } from '../pages/BookDetail';
import HomePage from '../pages/Home';
import { Login } from '../pages/Login';
import { NoPageFound } from '../pages/NoPageFound';
import { UserProfile } from '../pages/UserProfile';
import { ProtectedRoute } from './ProtectedRoute';

export const Routes = () => {
    const { token } = useAuth();

    const publicRoutes = [
        {
            path: 'books',
            element: <BookDetail />
        },
        {
            path: '*',
            element: <NoPageFound />
        },
        {
            path: '/login',
            element: <Login />
        }
    ];

    const routesForAuthenticated = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/profile',
                    element: <UserProfile />
                },
                {
                    path: '/logout',
                    element: <div>Log out</div>
                }
            ]
        }
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: '/home',
            element: <HomePage />
        },
        {
            path: '/',
            element: <Navigate to={'/home'} />
        }
    ];

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticated
    ]);

    return <RouterProvider router={router} />;
};
