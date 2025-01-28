import useMyAgreement from '../../../Hooks/useMyAgreement';
import Loading from '../../../Components/Shared/Loading';
import { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link } from 'react-router-dom';

const Booking = () => {
  const { user } = useContext(AuthContext);
  const { agreements, isLoading, error } = useMyAgreement(user?.email);

// using reduce to get the total price from array
const totalPrice = agreements.reduce((total, item) => {
    // Remove the $ sign and parse the price as a number
    const price = parseFloat(item.price.replace('$', '').trim()) || 0;
    return total + price;
  }, 0);
  
  //.replace('$', '') removes the $ sign.
//.trim() ensures that there are no leading or trailing spaces (in case there are any).
  
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">Error fetching agreements: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex justify-center  bg-gray-50 p-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-8">Rented Booking Details</h2>

        {agreements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agreements.map((agreement) => (
              <div
                key={agreement._id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Flat No and Location */}
                <div className="mb-4">
                  <p className="text-xl font-semibold text-indigo-700"><strong>Flat No:</strong> {agreement.flatName}</p>
                  <p className="text-gray-700 text-lg"><strong>Location:</strong> {agreement.location}</p>
                </div>

                {/* Area and Price */}
                <div className="mb-4">
                  <p className="text-lg"><strong>Area:</strong> {agreement.area}</p>
                  <p className="text-lg"><strong>Price:</strong> {agreement.price}</p>
                </div>

                {/* Agreement Accepted Date */}
                <div className="mt-auto">
                  <p className="text-lg text-gray-600"><strong>Agreement Accepted On:</strong> {new Date(agreement.acceptDate).toLocaleDateString()}</p>
                  <p>Total Price: {totalPrice}</p>
                </div>
                
              </div>
              
            ))}
            <div className='flex justify-center items-center'>
            <Link to='/dashboard/payment' className='bg-warning p-4 rounded-lg font-bold '>Make payment</Link>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-500 text-center">No agreements found.</p>
        )}
      </div>
      
    </div>
  );
};

export default Booking;
