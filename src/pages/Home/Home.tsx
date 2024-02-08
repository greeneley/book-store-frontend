import React from 'react';
import { NavbarComponent } from '@components/Navbar/NavbarComponent';
import { MainContent } from '@components/MainContent/MainContent';
import { TopSeller } from '@components/TopSeller/TopSeller';
import { RecommendBooks } from '@components/RecommendBooks/RecommendBooks';

const Home = () => {
    return (
        <>
            <NavbarComponent />
            <MainContent />
            <TopSeller />
            <br />
            <RecommendBooks />
        </>
    );
};

export default Home;
