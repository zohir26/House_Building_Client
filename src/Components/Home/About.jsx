import React from 'react';
import { motion } from "framer-motion"; // Note: corrected import from "motion/react" to "framer-motion"

const About = () => {
    return (
        <div className="flex justify-center items-center px-4 py-10">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-7xl">
                <div className='text-center w-full'>
                    <h1 className="text-5xl font-bold mb-4">About the Building</h1>
                    <p className="py-4 text-lg">
                        <span className='font-bold text-2xl block mb-2'>Welcome to Your Dream Home</span>
                        Experience the pinnacle of luxury living at our newly developed residential building, nestled in the heart of the city. This meticulously designed building offers an unparalleled blend of modern architecture, state-of-the-art amenities, and exceptional comfort, making it the perfect place to call home.
                    </p>
                    <div className='py-6'>
                        <img
                            src="https://i.ibb.co/F8DcsDy/ap8.jpg"
                            className="rounded-lg w-full max-w-xl mx-auto"
                            alt="Building"
                        />
                    </div>

                    {/* Card section */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                        {[
                            {
                                title: "Prime Location",
                                text: "Situated in a prestigious neighborhood, the building provides easy access to top-rated schools, renowned shopping destinations, gourmet restaurants, and cultural landmarks.",
                                bg: "bg-red-200"
                            },
                            {
                                title: "Elegant Design",
                                text: "Our building boasts a contemporary design with sleek lines and sophisticated features including floor-to-ceiling windows and premium finishes.",
                                bg: "bg-red-300"
                            },
                            {
                                title: "Smart Home Technology",
                                text: "Control lighting, climate, security, and entertainment systems with ease from anywhere with cutting-edge smart home features.",
                                bg: "bg-red-200"
                            },
                            {
                                title: "Safety and Security",
                                text: "Advanced 24/7 surveillance and modern security systems ensure the utmost safety and peace of mind for residents.",
                                bg: "bg-red-300"
                            }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", duration: 1 }}
                                className={`${card.bg} p-6 rounded-xl flex flex-col justify-between h-full`}
                            >
                                <h3 className='font-bold text-lg mb-2'>{card.title}</h3>
                                <p className='text-sm text-gray-700'>{card.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button className="btn btn-primary">Get Started</button>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default About;
