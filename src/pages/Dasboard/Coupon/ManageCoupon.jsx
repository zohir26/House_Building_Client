import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa6';

const ManageCoupon = () => {
    const axiosSecure = useAxiosSecure();
    const { data: manageCoupon = [], refetch } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupons')
            return res.data
        }
    })

    const handleDeleteCoupon = (coupon) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/coupons/${coupon._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };
    return (
        <div>
            <div className='flex gap-4 justify-evenly'>
                <h2 className='text-2xl font-bold text-center'>Manage Coupons</h2>
                <h2 className='text-2xl font-bold text-center'>Total Coupons:{manageCoupon.length}</h2>
            </div>

            {/* coupon table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Main Price</th>
                            <th>Coupon Price</th>
                            <th>Coupon Description</th>
                            <th>Action</th>

                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageCoupon.map((coupon, index) =>
                                <tr key={coupon._id}>
                                    <th>{index + 1}</th>
                                    <td>{coupon.main_price}</td>
                                    <td>{coupon.coupon_price}</td>
                                    <td>
                                       {coupon.description}
                                    </td>
                                    
                                    <td> <button
                                            onClick={() => handleDeleteCoupon(coupon)}
                                            className='btn btn-error'>
                                            <FaTrash />
                                        </button></td>
                                   
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCoupon;