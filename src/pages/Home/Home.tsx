import React from 'react';
import { HeaderComponent } from '@components/Header/HeaderComponent';
import { MainContent } from '@components/MainContent/MainContent';
import { TopSeller } from '@components/TopSeller/TopSeller';
import { RecommendBooks } from '@components/RecommendBooks/RecommendBooks';
import { BookList } from '@components/CardList/BookList';
import { Footer } from '@components/Footer/Footer';

const Home = () => {
    return (
        <>
            <HeaderComponent />
            <MainContent />
            <TopSeller />
            <RecommendBooks />
            <BookList />
            <Footer />
        </>
    );
};

export default Home;
