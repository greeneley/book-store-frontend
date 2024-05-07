import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from 'react-router-dom';
import React from 'react';
import HomePage from '../pages/Home';
import { Login } from '../pages/Login';
import { BookDetail } from '../pages/BookDetail';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContextProvider';

export const Routes = () => {
    const { token } = useAuth();

    const publicRoutes = [
        {
            path: 'books',
            element: <BookDetail />
        }
    ];

    const routesForAuthenticated = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/profile',
                    element: <div>User Profile</div>
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
        },
        {
            path: '/login',
            element: <Login />
        }
    ];

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticated
    ]);

    return <RouterProvider router={router} />;
};
