import React from 'react';
import { NavbarComponent } from '@components/Navbar/NavbarComponent';
import { MainContent } from '@components/MainContent/MainContent';
import { TopSeller } from '@components/TopSeller/TopSeller';
import { RecommendBooks } from '@components/RecommendBooks/RecommendBooks';
import { CardList } from '@components/CardList/CardList';

const Home = () => {
    return (
        <>
            <NavbarComponent />
            <MainContent />
            <TopSeller />
            <RecommendBooks />
            <CardList />
        </>
    );
};

export default Home;
