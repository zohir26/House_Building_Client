import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { createContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CheckOutForm = ({ apartment, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext)
  console.log({ user })
  // implementing coupon
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  // make the price free of $ sign 
  const price = parseFloat(apartment.price.replace('$', '').trim()) || 0;
  console.log(price)

  const [discountedPrice, setDiscountedPrice] = useState(price); // Start with original price
  //get the coupons
  useEffect(() => {
    axiosSecure.get('/coupons')
        .then(res => {
            setCoupons(res.data);
        })
        .catch(err => console.error(err));
}, []);
// handle price after coupon applied
const handleCouponPrice = (coupon) => {
  setSelectedCoupon(coupon);
  
  // Calculate the new price after applying the coupon
  const newPrice = price - coupon.coupon_price;
  
  // Ensure price doesn't go negative
  setDiscountedPrice(newPrice > 0 ? newPrice : 0);
};

  // get the payment data if matches disable the pay now button
  const [getPayment, setGetPayment] = useState('');
  // get the payment info when page is reloaded if payment database have user email then disable the payment button. 
  useEffect(() => {
    axiosSecure.get(`/payments/${user.email}`)
      .then(res => {
        console.log(res.data)
        setGetPayment(res.data)
      })
  }, [user?.email, axiosSecure])

  console.log(getPayment)
  // fetch the card 
  useEffect(() => {
    if (discountedPrice > 0) {
        axiosSecure.post("/create-payment-intent", { price: discountedPrice }).then(res => {
            setClientSecret(res.data.clientSecret);
        });
    }
}, [discountedPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Card details are not entered.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent?.status === 'succeeded') {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Payment has been successful",
          showConfirmButton: false,
          timer: 1500
        });
        setSuccess("Payment successful!");

        // save the payment data to database;
        const payment = {
          email: user.email,
          price: price,
          date: new Date().toISOString(),// use moment js
          flatName: apartment.flatName,
          name: user.userName || "Anonymous",
          TransactionId: paymentIntent.id,
        }
        axiosSecure.post('/payment', payment)
          .then(res => {
            console.log(res.data)
          })
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Apartment Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Flat Name</label>
          <input
            type="text"
            value={apartment?.flatName || ""}
            readOnly
            className="w-full p-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Location</label>
          <input
            type="text"
            value={apartment?.location || ""}
            readOnly
            className="w-full p-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Price</label>
        <input
          type="text"
          value={apartment?.price || ""}
          readOnly
          className="w-full p-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:justify-center lg:items-center">
        <div>
          <label className="block text-sm font-medium text-gray-600">Coupon</label>
          <input
            type="text"
            className="w-full p-2  text-gray-700 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <Link to="/coupons">
            <button
              onClick={handleCouponPrice}
              className="btn p-2 mt-4 btn-primary">
              All Coupons
            </button>
          </Link>
        </div>
      </div>


      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={userEmail || ""}
          readOnly
          className="w-full p-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Card Element */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Card Details</label>
        <div className="p-4 bg-white border border-gray-300 rounded-lg">

          {/* // card element */}
          <CardElement className="p-2" />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Payment Button */}
      <div className="text-center">
        <div className='flex justify-center items-center mt-6'>
          {getPayment.email ? (
            <button className='bg-green-500 text-white px-6 py-3 rounded-lg font-bold cursor-not-allowed' disabled>Booked</button>
          ) : (
            <button onClick={handleSubmit}
              type="submit"
              disabled={loading || !stripe || !clientSecret}
              className="w-full py-2 mt-4 bg-orange-400 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition-colors"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          )}
        </div>
      </div>

      {/* Success Message */}
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </form>
  );
};

export default CheckOutForm;
