import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';

const ManageBooking = () => {
  const axiosSecure = useAxiosSecure();
//   const [agreement, setAgreement] = useState([]);
  // Load agreement data
  const { data: agreements = [], refetch } = useQuery({
    queryKey: ['agreements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agreements');
    //   setAgreement(res.data); 
      return res.data;
    },
  });

  // Handle accept/reject actions
  const handleStatusChange = async (agreement, action) => {
    try {
      const updatedStatus = action === 'accept' ? 'checked' : 'checked';
      const updatedRole = action === 'accept' ? 'member' : agreement.role;

      // Update status and role via API
      const res = await axiosSecure.patch(`/agreements/${agreement._id}`, {
        status: updatedStatus,
        role: updatedRole,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: `The agreement has been ${action}ed successfully.`,
          icon: 'success',
        });
        refetch(); // Refresh data
        // remove from ui after the the status is changed.
        // setAgreement((prev) =>
        //     prev.filter((item) => item._id !== agreement._id)
        //   );
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Failed to ${action} the agreement.`,
        icon: 'error',
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Booking Agreements</h1>

      {/* Agreement Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">User Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Flat Name</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Area</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agreement, index) => (
              <tr key={agreement._id}>
                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-2">{agreement.userName}</td>
                <td className="border border-gray-300 p-2">{agreement.userEmail}</td>
                <td className="border border-gray-300 p-2">{agreement.flatName}</td>
                <td className="border border-gray-300 p-2">{agreement.location}</td>
                <td className="border border-gray-300 p-2">{agreement.price}</td>
                <td className="border border-gray-300 p-2">{agreement.area}</td>
                <td className="border border-gray-300 p-2 text-center">{agreement.status}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <select
                    className="border border-gray-300 px-2 py-1 rounded"
                    onChange={(e) => handleStatusChange(agreement, e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="accept">Accept</option>
                    <option value="reject">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
