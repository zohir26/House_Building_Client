import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'react-responsive-carousel';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    const axiosSecure = useAxiosSecure();

    const { data: apartments = [], isLoading, isError } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/apartments');
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center text-lg font-bold">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-lg font-bold text-red-500">Error fetching apartments data</div>;
    }

    return (
                <div className="container mx-auto py-8">
                    <h2 className="text-center text-2xl font-semibold mb-6 ">
                        Grab the best flats at affordable prices
                    </h2>
                    <Carousel
                        showArrows={true}
                        infiniteLoop={true}
                        useKeyboardArrows={true}
                        autoPlay={true}
                        interval={3000}
                        transitionTime={500}
                        showThumbs= {false}
                        centerMode= {true}
                        showStatus={false}
                        
                        
                    >
                        {apartments.map(apartment => (
                            <div key={apartment.id} className="relative">
                                <img
                                    src={apartment.img}
                                    alt={`Apartment ${apartment.id}`}
                                    className="h-[600px] w-full object-cover"
                                />
                                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded">
                                    Apartment {apartment._id}
                                </p>
                            </div>
                        ))}
                    </Carousel>
                </div>
    );
};

export default Banner;