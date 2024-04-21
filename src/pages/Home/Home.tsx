import React from 'react';
import { NavbarComponent } from '@components/Navbar/NavbarComponent';
import { MainContent } from '@components/MainContent/MainContent';
import { TopSeller } from '@components/TopSeller/TopSeller';
import { RecommendBooks } from '@components/RecommendBooks/RecommendBooks';
import { BookList } from '@components/CardList/BookList';

const Home = () => {
    return (
        <>
            <NavbarComponent />
            <MainContent />
            <TopSeller />
            <RecommendBooks />
            <BookList />
        </>
    );
};

export default Home;
