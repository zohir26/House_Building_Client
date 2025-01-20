import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import Apartments from '../Components/Home/Apartments';
import Banner from '../Components/Home/Banner';

const HomeLayout = () => {
    return (
        <>
        <Navbar></Navbar>
        <Banner></Banner>
        {/* <Apartments></Apartments> */}
        <Footer></Footer>
        </>
    );
};

export default HomeLayout;