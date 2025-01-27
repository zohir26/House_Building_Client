import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Loading from '../../Components/Shared/Loading';
import useMyAgreement from '../../Hooks/useMyAgreement';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
const axiosSecure = useAxiosSecure();

 // todo: fetch apartment data
  const {data:apartment =[]} = useQuery({
    queryKey: ['apartment'],
    queryFn: async () =>{
        const res = await axiosSecure.get('/apartments')
        return res.data
    }
  })
 // todo: fetch available agreement

// todo: all agreement
  const {data: agreement =[]}= useQuery({
    queryKey: ['agreements'],
    queryFn: async () =>{
        const res = await  axiosSecure.get('/agreements')
         return res.data
    }
  })

 // todo: No of users
   const { data: users = [], refetch } = useQuery({
          queryKey: ['users'],
          // for localstorage the headers need to send
          queryFn: async () => {
              const res = await axiosSecure.get('/users');
              return res.data;
          }
      });
 
 // todo: No of members
      const {data:member=[]}= useQuery({
        queryKey:['members'],
        queryFn:async ()=>{
           const res= await axiosSecure.get('/agreements', {
                params: {role:'member'}
            })
            return res.data;
        }
      })
     const availableRoom = apartment.length - member.length
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
      <div className="min-h-screen flex justify-center  bg-gray-50 p-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-8">Rented Booking Details</h2>
        <ul className='text-2xl py-4 flex flex-col gap-4'>
            <li>Total Rooms: {apartment.length} </li>
            <li> No Available Rooms:{availableRoom} </li>
            <li>No Agreement:{agreement.length} </li>
            <li> No of Users: {users.length} </li>
            <li> No of Members:{member.length} </li>
        </ul>
       
      </div>
      
    </div>
    </div>
  );
};

export default AdminProfile;
