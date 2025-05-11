import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ReactStars from "react-rating-stars-component";

const Reviews = () => {
    const axiosSecure = useAxiosSecure();

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        },
    });

    return (
        <>
            <h1 className='text-center text-2xl font-bold py-6'>See what our customers are saying...</h1>
            <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
                {
                    reviews.map((review, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto w-full">
                            <figure>
                                <img
                                src={review.img}
                                alt="Customer"
                                className="w-full h-48 object-cover"
                            />
                            </figure>
                            <div className="p-4 space-y-2">
                                <h2 className="text-lg font-semibold">Name: {review.name}</h2>
                                <p className="text-gray-600">Flat Purchased: {review.flat_purchased}</p>
                                <p className="text-gray-700">Experience: {review.experience}</p>
                                <div className="flex justify-start items-center">
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        value={review.rating}
                                        size={24}
                                        activeColor="#ffd700"
                                        edit={false}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Reviews;
