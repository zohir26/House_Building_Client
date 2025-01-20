import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import Apartments from '../Components/Home/Apartments';

const HomeLayout = () => {
    return (
        <>
        <Navbar></Navbar>

        <Apartments></Apartments>
        <Footer></Footer>
        </>
    );
};

export default HomeLayout;