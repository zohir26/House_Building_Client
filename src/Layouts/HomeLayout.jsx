import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
// import Apartments from '../pages/Apartments';
import Banner from '../Components/Home/Banner';
import About from '../Components/Home/About';
import Location from '../Components/Home/Location';
import Reviews from '../Components/Home/Reviews';
import Coupons from '../Components/Home/Coupons';

const HomeLayout = () => {
    return (
        <>
        <Navbar></Navbar>
        <Banner></Banner>
        {/* <Apartments></Apartments> */}
        <About></About>
        <Location></Location>
       <div className=' '>
       <Reviews></Reviews>
       </div>
       <Coupons></Coupons>
        <Footer></Footer>
        </>
    );
};

export default HomeLayout;