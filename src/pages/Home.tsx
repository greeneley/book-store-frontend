import { BookList } from '@components/CardList/BookList';
import { MainContent } from '@components/MainContent/MainContent';
import { RecommendBooks } from '@components/RecommendBooks/RecommendBooks';
import { TopSeller } from '@components/TopSeller/TopSeller';
import React from 'react';

const Home = () => {
    return (
        <>
            <MainContent />
            <TopSeller />
            <RecommendBooks />
            <BookList />
        </>
    );
};

export default Home;
