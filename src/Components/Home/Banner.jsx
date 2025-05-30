import React from 'react';
import { useQuery } from "react-query";
import { Carousel } from 'react-responsive-carousel';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from '../Shared/Loading';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
    const axiosSecure = useAxiosSecure();

    const { data: apartments = [], isLoading, isError } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/apartments');
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (isError)
        return (
            <div className="text-center text-lg font-bold text-red-500 py-8">
                Error fetching apartments data
            </div>
        );

    if (apartments.length === 0) {
        return (
            <div className="text-center text-lg font-semibold py-8 text-gray-500">
                No apartments available at the moment.
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            {/* <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                Grab the best flats at affordable prices
            </h2> */}
            {/* Persistent Typing Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="bg-black bg-opacity-50 text-white text-xl md:text-3xl font-semibold px-6 py-4 rounded-lg shadow-lg transition-opacity duration-1000 opacity-100">
                    <Typewriter
                        words={['Find Your Dream Apartment Today']}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={80}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </div>
            </div>

            <Carousel
                showArrows
                infiniteLoop
                useKeyboardArrows
                autoPlay
                interval={4000}
                transitionTime={600}
                showThumbs={false}
                centerMode={false}
                showStatus={false}
                swipeable
                emulateTouch
            >
                {apartments.map(apartment => (
                    <div key={apartment._id} className="relative">
                        <img
                            src={apartment.img}
                            alt={`Apartment ${apartment.title || apartment._id}`}
                            className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover rounded-lg"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                            <h3 className="text-white text-lg font-semibold">
                                {apartment.title}
                            </h3>
                        </div>

                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
