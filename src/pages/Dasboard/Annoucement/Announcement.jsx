
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from 'react-query';

const Announcement = () => {
    const axiosPublic = useAxiosPublic();
    const { data: announcement = [], refetch } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcement');
            return res.data;
        },
    });

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center my-4">
                Announcements: {announcement.length}
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {announcement.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-semibold text-orange-500 mb-2">
                            {item.title}
                        </h2>
                        <p className="text-gray-700">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcement;
