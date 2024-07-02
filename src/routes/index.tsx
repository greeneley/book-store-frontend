import { Cart } from '@pages/Cart';
import HomeBookStore from '@pages/home/HomeBookStore';
import ScrollToTop from '@utils/helpers/scroll-top';
import axios from 'axios';
import React, { lazy, Suspense } from 'react';
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { BookDetail } from '../pages/BookDetail';
import { Checkout } from '../pages/Checkout';
import { MainLayout } from '../pages/MainLayout';
import { UserProfile } from '../pages/UserProfile';
import { ProtectedRoute } from './ProtectedRoute';

const NotFound = lazy(() => import('@pages/others/NotFound'));

const LoginRegister = lazy(() => import('@pages/others/LoginRegister'));
const HomeBookStore = lazy(() => import('@pages/others/HomeBookStore'));
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
                        <Outlet />
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
                    path: '/login-register',
                    element: <LoginRegister />
                },
                {
                    path: '/home',
                    element: <HomeBookStore />
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
