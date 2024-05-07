// import '@arcgis/core/assets/esri/themes/dark/main.css';
import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';
import '@styles/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import 'react-multi-carousel/lib/styles.css';
import { HeaderComponent } from '@components/Header/HeaderComponent';
import { Footer } from '@components/Footer/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AuthProvider } from './contexts/AuthContextProvider';
import { Routes } from './routes';

library.add(fas, faTwitter, faFontAwesome);

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AuthProvider>
                    <div className="flex flex-col">
                        <HeaderComponent />
                        <div className="page-container bg-gray-100">
                            <Routes />
                        </div>
                        <Footer />
                    </div>
                </AuthProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
})();
