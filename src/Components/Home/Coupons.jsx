import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Coupons = () => {
    const axiosSecure = useAxiosSecure();
// fetching data from mongodb using axios
    const { data: coupons = [] } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupons');
            return res.data;
        },
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Available Coupons</h1>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <div
                        key={coupon._id}
                        className="card w-96 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 mx-auto"
                    >
                        <img
                            src={coupon.img}
                            alt="Coupon"
                            className="w-full h-48 object-cover"
                        />
                        // show the coupon info into cards
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">{coupon.description}</h2>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-gray-500 line-through">{coupon.main_price}</span>
                                <span className="text-green-600 font-bold">{coupon.coupon_price}</span>
                            </div>
                            <button className="btn btn-primary w-full mt-4">Use Coupon</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Coupons;
