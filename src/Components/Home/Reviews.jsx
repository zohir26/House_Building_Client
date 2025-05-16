import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ReactStars from "react-rating-stars-component";
import { motion } from 'motion/react';
import { useQuery } from 'react-query';

const Reviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        },
    });

    return (
        <div className="bg-[#f9fafb] py-12 px-4">
            <h1 className="text-4xl font-extrabold text-center text-[#2C3E50] mb-10">
                See What Our Customers Are Saying
            </h1>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                        <figure>
                            <img
                                src={review.img}
                                alt={review.name}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="p-6 space-y-3">
                            <h2 className="text-lg font-semibold text-[#2C3E50]">
                                Name: {review.name}
                            </h2>
                            <p className="text-gray-600">
                                Flat Purchased: {review.flat_purchased}
                            </p>
                            <p className="text-gray-700">
                                Experience: {review.experience}
                            </p>
                            <div className="flex items-center">
                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    size={24}
                                    activeColor="#ffd700"
                                    edit={false}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    ({review.rating})
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
