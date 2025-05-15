import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Prime Location",
      text: "Situated in a prestigious neighborhood, the building provides easy access to top-rated schools, renowned shopping destinations, gourmet restaurants, and cultural landmarks."
    },
    {
      title: "Elegant Design",
      text: "Our building boasts a contemporary design with sleek lines and sophisticated features including floor-to-ceiling windows and premium finishes."
    },
    {
      title: "Smart Home Technology",
      text: "Control lighting, climate, security, and entertainment systems with ease from anywhere with cutting-edge smart home features."
    },
    {
      title: "Safety and Security",
      text: "Advanced 24/7 surveillance and modern security systems ensure the utmost safety and peace of mind for residents."
    }
  ];

  return (
    <section className="bg-white text-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.ibb.co/F8DcsDy/ap8.jpg"
            alt="Building"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Text Content Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#2C3E50]">
            About the Building
          </h2>
          <p className="text-xl font-semibold text-gray-700 mb-4">
            Welcome to Your Dream Home
          </p>
          <p className="text-gray-600 mb-8">
            Experience the pinnacle of luxury living at our newly developed residential building, nestled in the heart of the city. This meticulously designed property offers an unparalleled blend of modern architecture, state-of-the-art amenities, and exceptional comfort.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {cardData.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#2C3E50] text-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm">{card.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/apartments')}
            className="btn btn-primary text-white px-6 py-2 rounded-lg shadow-md"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default About;

