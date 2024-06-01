// import '@arcgis/core/assets/esri/themes/dark/main.css';
import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@styles/style.scss';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { AppContextProvider } from './contexts/AppContextProvider';
import { AuthProvider } from './contexts/AuthContextProvider';
import { Routes } from './routes';
import configureAppStore, { getPreloadedState } from './store/configureStore';

library.add(fas, faTwitter, faFontAwesome);

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AuthProvider>
                    <AppContextProvider>
                        <Routes />
                    </AppContextProvider>
                </AuthProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
})();
