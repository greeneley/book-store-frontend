// import '@arcgis/core/assets/esri/themes/dark/main.css';
import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';
import './styles/custom.scss';
import HomePage from './pages/Home/Home';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import 'react-multi-carousel/lib/styles.css';
import { HeaderComponent } from '@components/Header/HeaderComponent';
import { Footer } from '@components/Footer/Footer';

library.add(fas, faTwitter, faFontAwesome);
import { BookDetail } from './pages/BookDetail/BookDetail';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    const router = createBrowserRouter([
        {
            path: '/home',
            element: <HomePage />
        },
        {
            path: '/',
            element: <Navigate to={'/home'} />
        },
        {
            path: 'books',
            element: <BookDetail />
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ]);

    root.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AppContextProvider>
                    <HeaderComponent />
                    <div className="bg-gray-100">
                        <RouterProvider router={router} />
                    </div>
                    <Footer />
                </AppContextProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
})();
