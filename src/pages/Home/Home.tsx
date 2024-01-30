import React from 'react';
import { NavbarComponent } from '@components/Navbar/NavbarComponent';
import { MainContent } from '@components/MainContent/MainContent';
import { TopSeller } from '@components/TopSeller/TopSeller';

const Home = () => {
    return (
        <>
            <NavbarComponent />
            <MainContent />
            <TopSeller />
        </>
    );
};

export default Home;
