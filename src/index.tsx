// import '@arcgis/core/assets/esri/themes/dark/main.css';
import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './pages/Home/Home';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(fas, faTwitter, faFontAwesome);

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AppContextProvider>
                    <HomePage />
                </AppContextProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
})();
