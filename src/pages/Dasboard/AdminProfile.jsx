import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Loading from '../../Components/Shared/Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { useQuery } from 'react-query';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch all apartments
  const { data: apartment = [], isLoading: loading1 } = useQuery(['apartment'], async () => {
    const res = await axiosSecure.get('/apartments');
    return res.data;
  });

  // Fetch all agreements
  const { data: agreement = [], isLoading: loading2 } = useQuery(['agreements'], async () => {
    const res = await axiosSecure.get('/agreements');
    return res.data;
  });

  // Fetch all users
  const { data: users = [], isLoading: loading3 } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  // Fetch members (agreements where role = 'member')
  const { data: member = [], isLoading: loading4 } = useQuery(['members'], async () => {
    const res = await axiosSecure.get('/agreements', {
      params: { role: 'member' },
    });
    return res.data;
  });

  // Show loading spinner until all data is ready
  if (loading1 || loading2 || loading3 || loading4) {
    return <Loading />;
  }

  // Calculate available rooms
  const availableRoom = apartment.length - member.length;

  // Data for pie chart
  const pieData = [
    { name: 'Available', value: availableRoom },
    { name: 'Booked', value: member.length },
  ];

  // Data for bar chart
  const barData = [
    { name: 'Users', value: users.length },
    { name: 'Agreements', value: agreement.length },
    { name: 'Apartments', value: apartment.length },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Profile & Statistics</h1>

      {/* Admin profile info */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL || '/default-user.png'}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-700">{user?.displayName || 'Anonymous'}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center text-indigo-600 mb-4">Room Availability</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center text-indigo-600 mb-4">System Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
