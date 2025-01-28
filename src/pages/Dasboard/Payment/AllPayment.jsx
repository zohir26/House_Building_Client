import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const AllPayment = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
const { data: payments = [] } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
        const res = await axiosSecure.get('/payments'); // Ensure user.email is correctly set
        return res.data;
    },
});

    return (
        <div className="p-5">
        <h1 className="text-2xl font-bold mb-4 text-center"> All payment History: {payments.length}</h1>
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Flat Name</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment.TransactionId} className="odd:bg-white even:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2 break-all">{payment.TransactionId}</td>
                            <td className="border border-gray-300 px-4 py-2">{payment.name}</td>
                            <td className="border border-gray-300 px-4 py-2 break-all">{payment.email}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{payment.flatName}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">${payment.price}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {new Date(payment.date).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllPayment;