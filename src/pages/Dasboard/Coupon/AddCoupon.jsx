import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CouponForm = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    main_price: '',
    coupon_price: '',
    description: '',
    img: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
 
    e.preventDefault();
    console.log('Form Data:', formData);
    // Send formData to database here
    axiosSecure.post('/coupons',formData )
    .then(res=>{
        console.log('form data', res. data)

        if (res.data.insertedId){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your Coupon Has Added",
                showConfirmButton: false,
                timer: 1500
              });
        navigate('/dashboard/coupons')
        }
    })

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 w-full">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Add New Coupon</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Price */}
          <div>
            <label htmlFor="main_price" className="block text-gray-600 font-medium mb-1">
              Main Price
            </label>
            <input
              type="text"
              name="main_price"
              id="main_price"
              value={formData.main_price}
              onChange={handleChange}
              placeholder="Enter main price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Coupon Price */}
          <div>
            <label htmlFor="coupon_price" className="block text-gray-600 font-medium mb-1">
              Coupon Price
            </label>
            <input
              type="number"
              name="coupon_price"
              id="coupon_price"
              value={formData.coupon_price}
              onChange={handleChange}
              placeholder="Enter coupon price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Coupon Description */}
          <div>
            <label htmlFor="description" className="block text-gray-600 font-medium mb-1">
              Coupon Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter coupon description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Coupon Image */}
          <div>
            <label htmlFor="img" className="block text-gray-600 font-medium mb-1">
              Coupon Image URL
            </label>
            <input
              type="text"
              name="img"
              id="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;
