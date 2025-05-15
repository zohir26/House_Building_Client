import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const Coupons = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: coupons = [] } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupons');
            return res.data;
        },
    });

    return (
        <div className="bg-[#f9fafb] py-8 px-4">
            <h1 className="text-4xl font-extrabold text-center text-[#2C3E50] mb-10">
                Available Coupons
            </h1>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons.map((coupon) => (
                    <motion.div
                        key={coupon._id}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white rounded-2xl shadow-md overflow-hidden"
                        onClick={() => navigate('/apartments')}
                    >
                        <img
                            src={coupon.img}
                            alt="Coupon"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 space-y-3">
                            <h2 className="text-lg font-semibold text-[#2C3E50]">
                                {coupon.description}
                            </h2>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-500 line-through text-sm">
                                    {coupon.main_price}
                                </span>
                                <span className="text-green-600 font-bold text-lg">
                                    {coupon.coupon_price}
                                </span>
                            </div>
                            <button className="btn btn-primary w-full mt-4">
                                Use Coupon
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Coupons;
