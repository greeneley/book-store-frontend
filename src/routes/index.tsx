import { Cart } from '@pages/Cart';
import ScrollToTop from '@utils/helpers/scroll-top';
import axios from 'axios';
import React, { lazy, Suspense } from 'react';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { BookDetail } from '../pages/BookDetail';
import { Checkout } from '../pages/Checkout';
import HomePage from '../pages/Home';
import { Login } from '../pages/Login';
import { MainLayout } from '../pages/MainLayout';
import { UserProfile } from '../pages/UserProfile';
import { ProtectedRoute } from './ProtectedRoute';

const NotFound = lazy(() => import('@pages/NotFound'));

export const Routes = () => {
    const { token } = useAuth();

    const publicRoutes = [
        {
            path: '/',
            element: (
                <ScrollToTop>
                    <Suspense
                        fallback={
                            <div className="flone-preloader-wrapper">
                                <div className="flone-preloader">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        }
                    >
                        <MainLayout />
                    </Suspense>
                </ScrollToTop>
            ),
            children: [
                {
                    path: '/book/:bookId',
                    element: <BookDetail />,
                    loader: async ({ params }: any) => {
                        const response = await axios.get(
                            `http://localhost:8081/api/v1/books/${params.bookId}`
                        );

                        return response.data;
                    }
                },
                {
                    path: '*',
                    element: <NotFound />
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
                    element: <Cart />,
                    loader: async () => {
                        // const response = await axios.get(
                        //     `http://localhost:8081/api/v1/cart`,
                        //     {
                        //         headers: {
                        //             Authorization: 'Bearer ' + token
                        //         }
                        //     }
                        // );
                        //
                        // return response.data;
                    }
                },
                {
                    path: '/checkout',
                    element: <Checkout />,
                    loader: async () => {
                        // const response = await axios.get(
                        //     `http://localhost:8081/api/v1/cart`,
                        //     {
                        //         headers: {
                        //             Authorization: 'Bearer ' + token
                        //         }
                        //     }
                        // );
                        //
                        // return response.data;
                    }
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
