import React, { useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../Components/Shared/Loading";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import ReactPaginate from "react-paginate";
import { FaSearchLocation } from "react-icons/fa";

const Apartments = () => {


  
  const [currentPage, setCurrentPage] = useState(1);
  const [apartments, setApartments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const limit = 6;
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/apartmentPage?page=${currentPage}&limit=${limit}&min=${minPrice}&max=${maxPrice}`);
        setApartments(res.data.apartments || []);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      } catch (err) {
        setError("Error fetching apartments data");
        setLoading(false);
      }
    };

    fetchApartments();
  }, [currentPage, axiosSecure, minPrice, maxPrice]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleFilter = () => {
    const sanitizedMin = parseInt(minPrice.trim(), 10) || 0;
    const sanitizedMax = parseInt(maxPrice.trim(), 10) || Infinity;
    setMinPrice(sanitizedMin);
    setMaxPrice(sanitizedMax);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-lg font-bold text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Available Apartments</h1>
        <div className="flex gap-3 p-6 justify-center items-center">
          <input
            className="p-4 rounded-xl"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
          />
          <input
            className="p-4 rounded-xl"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
          />
          <button className="btn btn-primary" onClick={handleFilter}>Filter</button>
          <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <div key={apartment._id} className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105">
              <img src={apartment.img} alt={apartment.flat_name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-700">Apartment No: {apartment.flat_name}</h2>
                <p className="text-gray-500 mt-2">Floor & Block: {apartment.location}</p>
                <p className="text-gray-700 font-medium mt-2">Rent: {apartment.price}</p>
                <p className="text-gray-500 mt-1">Area: {apartment.area}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Agreement
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={totalPages}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex space-x-4"}
            previousLinkClassName={"bg-gray-300 px-4 py-2 rounded-lg"}
            nextLinkClassName={"bg-gray-300 px-4 py-2 rounded-lg"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            activeClassName={"text-white bg-blue-600 px-4 py-2 rounded-lg"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Apartments;