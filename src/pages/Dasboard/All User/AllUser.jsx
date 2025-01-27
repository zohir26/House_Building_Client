import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaTrash, FaUser } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users', refetch],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleDeleteUser= (user)=>{
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
                axiosSecure.delete(`/users/${user._id}`)
                .then (res =>{
                    if(res.data.deletedCount>0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
             
            }
          });
    }
    return (
        <div >
            <div className=' flex justify-evenly gap-10 w-full'>
                <h2 className='text-3xl font-bold text-center'>All Users</h2>
                <h2 className='text-3xl font-bold text-center'>Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                            
                    </thead>
                    <tbody>
                        {
                            users.map((user,index) => 
                                <tr key={user._id}>
                                    <th>{index +1 }</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='btn btn-warning'>
                                            <FaUser></FaUser>
                                        </button>
                                    </td>
                                    <td>
                                    <button
                                    onClick={handleDeleteUser(user)}
                                    className='btn btn-error'>
                                           <FaTrash></FaTrash>
                                        </button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;