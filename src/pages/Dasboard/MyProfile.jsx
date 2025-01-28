import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Loading from '../../Components/Shared/Loading';
import useMyAgreement from '../../Hooks/useMyAgreement';

const MyProfile = () => {
//   const axiosSecure = useAxiosSecure(); // Axios instance with secure headers
  const { user } = useContext(AuthContext); // Get the logged-in user

  // Fetch agreement data using TanStack Query
  // const { data: agreements = [], isLoading, error } = useQuery({
  //   queryKey: ['agreement', user?.email], // Unique key with dependency on user.email
  //   queryFn: async () => {
  //     const response = await axiosSecure.get(`/agreement`, {
  //       params: { userEmail: user?.email }, // Pass user email as query parameter
  //     });
  //     return response.data; // Return the fetched data
  //   },
  //   enabled: !!user?.email, // Ensure the query runs only when user.email is available
  // });
const { agreements, isLoading, error } = useMyAgreement(user?.email);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">Error fetching agreements: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">My Profile</h1>

      {/* User Profile Section */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg">
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL || '/default-user.png'}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        <div className="ml-0 md:ml-6 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-700">{user?.displayName || 'Anonymous'}</h2>
          <p className="text-gray-500 mt-1">{user?.email}</p>
        </div>
      </div>

      {/* Agreement Details */}
  
    </div>
  );
};

export default MyProfile;
