import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useMyAgreement from "../../../Hooks/useMyAgreement";
import CheckOutForm from "./CheckOutForm";
import Loading from "../../../Components/Shared/Loading";

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const Payment = () => {
    const { user } = useContext(AuthContext);
    const { agreements, isLoading, error } = useMyAgreement(user?.email);

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error || !agreements) {
        return <div className="text-center py-10 text-red-500">Error fetching data.</div>;
    }

    // Assuming 'agreements' contains the payment information for the selected agreement
    const apartment = agreements[0]; // Adjust logic based on your data structure

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h1>
            <div className="divider divider-info"></div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm apartment={apartment} userEmail={user?.email} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
