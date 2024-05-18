import axios from 'axios';
import React from 'react';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { BookDetail } from '../pages/BookDetail';
import { Cart } from '../pages/Cart';
import HomePage from '../pages/Home';
import { Login } from '../pages/Login';
import { MainLayout } from '../pages/MainLayout';
import { NoPageFound } from '../pages/NoPageFound';
import { UserProfile } from '../pages/UserProfile';
import { ProtectedRoute } from './ProtectedRoute';

export const Routes = () => {
    const { token } = useAuth();

    const publicRoutes = [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/book/:bookId',
                    element: <BookDetail />,
                    loader: async ({ params }: any) => {
                        const response = await axios.get(
                            `http://localhost:8081/api/v1/books/${params.bookId}`,
                            {
                                headers: {
                                    Authorization: 'Bearer ' + token
                                }
                            }
                        );

                        return response.data;
                    }
                },
                {
                    path: '*',
                    element: <NoPageFound />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/home',
                    element: <HomePage />
                },
                {
                    path: '/',
                    element: <Navigate to={'/home'} />
                }
            ]
        }
    ];

    const routesForAuthenticated = [
        {
            path: '/',
            element: (
                <MainLayout>
                    <ProtectedRoute />
                </MainLayout>
            ),
            children: [
                {
                    path: '/profile',
                    element: <UserProfile />
                },
                {
                    path: '/logout',
                    element: <div>Log out</div>
                },
                {
                    path: '/cart',
                    element: <Cart />
                }
            ]
        }
    ];

    const router = createBrowserRouter([
        ...publicRoutes,
        ...routesForAuthenticated
    ]);

    return <RouterProvider router={router} />;
};
