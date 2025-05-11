import React from 'react';
import logo from '../../assets/logo.png';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-base-200 text-base-content w-full">
            <footer className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                {/* Logo & Text */}
                <div className="text-center md:text-left max-w-md">
                    <img src={logo} alt="Building Management Logo" className="w-32 mx-auto md:mx-0 mb-4" />
                    <p className="text-sm">
                        <span className="font-bold text-lg">Building Management</span><br />
                        Providing reliable building services since 1992.
                    </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-6 text-2xl">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                        <FaFacebook />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                        <FaXTwitter />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
                        <FaLinkedin />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
