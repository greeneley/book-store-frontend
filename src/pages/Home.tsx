import React from 'react';
import { MainContent } from '../components/MainContent/MainContent';
import { TopSeller } from '../components/TopSeller/TopSeller';
import { RecommendBooks } from '../components/RecommendBooks/RecommendBooks';
import { BookList } from '../components/CardList/BookList';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="p-8">
            <MainContent />
            <TopSeller />
            <RecommendBooks />
            <BookList />
        </div>
    );
};

export default Home;
