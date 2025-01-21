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
            <h1 className='text-center text-2xl font-bold py-4'>See what our customers are saying...</h1>
            <div className='container lg:w-full sm:w-1/2 mx-auto grid grid-cols-1 lg:grid-cols-3  '>

                {
                    reviews.map(review => (
                        <div className="card w-96 mx-auto">
                            <figure>
                                <img
                                    src="https://i.ibb.co.com/P1qQLg7/shakib.jpg"
                                    alt="car!" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Name: {review.name}</h2>
                                <p className=''>Flat Purchased:{review.flat_purchased}</p>
                                <p>Experience: {review.experience}</p>

                                <div className='flex justify-center items-center'>
                                <ReactStars count={5}
                                    onChange={ratingChanged}
                                    value= {review.rating}
                                    size={24}
                                    activeColor="#ffd700"
                                    >
                                    Rating: {review.rating}
                                </ReactStars>
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
