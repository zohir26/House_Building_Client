import React from 'react';
import { motion } from "motion/react"
const About = () => {
    return (
        <div className=" flex justify-center items-center">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className='text-center'>
                    <h1 className="text-5xl font-bold">About the Building</h1>
                    <p className="py-6">
                        <span className='font-bold text-2xl py-4'>Welcome to Your Dream Home</span> <br></br>

                        Experience the pinnacle of luxury living at our newly developed residential building, nestled in the heart of the city. This meticulously designed building offers an unparalleled blend of modern architecture, state-of-the-art amenities, and exceptional comfort, making it the perfect place to call home.
                    </p>
                    <div className='py-4 '>
                        <img
                            src="https://i.ibb.co.com/F8DcsDy/ap8.jpg"
                            className=" rounded-lg" />
                    </div>
                    <div className='lg:flex gap-3 mb-4 space-y-4 lg:space-y-0'>
                        <motion.div initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}

                            transition={{ type: "spring", duration: 1 }}>
                        <div className='bg-red-200 p-4 rounded-xl'>
                            <span className='font-bold'>Prime Location</span> <br />
                            Situated in a prestigious neighborhood, the building provides easy access to top-rated schools, renowned shopping destinations, gourmet restaurants, and cultural landmarks. Enjoy the convenience of urban living while being surrounded by lush green parks and serene walking paths.</div>
                        </motion.div>
                        <motion.div initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}

                            transition={{ type: "spring", duration: 1 }}>
                        <div className='bg-red-300 p-4 rounded-xl'>
                            <span className='font-bold'>Elegant Design</span> <br />
                            Our building boasts a contemporary design with sleek lines and a sophisticated facade. Each unit is thoughtfully crafted with an open floor plan, floor-to-ceiling windows, and high ceilings that flood the living spaces with natural light. The use of premium materials and finishes adds a touch of elegance and refinement to every corner.</div>
                        </motion.div>
                        <motion.div initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}

                            transition={{ type: "spring", duration: 1 }}>
                        <div className='bg-red-200 p-4 rounded-xl'>
                            <span className='font-bold'>Smart Home Technology</span> <br />
                            Each unit is equipped with cutting-edge smart home technology, allowing residents to control lighting, climate, security, and entertainment systems with ease. Stay connected and in control with the touch of a button, whether you are at home or on the go.</div>

                        </motion.div>
                        <motion.div initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}

                            transition={{ type: "spring", duration: 1 }}>

                            <div className='bg-red-300 p-4 rounded-xl'>
                                <span className='font-bold'>Safety and Security</span> <br />
                                The building is equipped with advanced security systems, including 24/7 surveillance, secure access control, and a dedicated concierge team, ensuring the utmost safety and peace of mind for residents.
                            </div>
                        </motion.div>

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