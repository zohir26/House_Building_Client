import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { IoLogoGoogle } from "react-icons/io";
import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import { auth, AuthContext } from '../provider/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Login = () => {
  const navigate = useNavigate();
  const { signInUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email and Password are required!',
      });
      return;
    }

    signInUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Logged in Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/');
        }
      })
      .catch((error) => {
        let errorMessage = 'Failed to login. Please try again.';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result.user)
        const user = result.user;
        const userInfo = {
          email: result.user.email,
          name: result.user?.displayName
        }
        axiosPublic.post('users', userInfo)
        .then(res=>{
          console.log(res.data)
        })
        console.log(userInfo)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Logged in with Google",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
          text: error.message,
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform skew-y-0 rotate-6 rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="text-center text-2xl font-semibold">Login</div>
              <form className="mt-8" onSubmit={handleSignIn}>
                <div className="mb-4">
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" name='email' />
                </div>
                <div className="mb-4">
                  <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" name='password' />
                </div>
                <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Login</button>
                <div className="mt-4 flex justify-between items-center gap-2">
                  <button onClick={handleGoogleSignIn} className="px-4 py-2 bg-red-500 text-white flex gap-2 justify-center items-center rounded-md hover:bg-red-600">
                    <IoLogoGoogle />Login with Google
                  </button>
                  <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
