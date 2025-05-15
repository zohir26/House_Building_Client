import logo from '../../assets/logo.png';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#2C3E50] text-white w-full py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                
                {/* Logo and Title Side by Side */}
                <div className="flex items-center gap-4 text-center md:text-left">
                    <img src={logo} alt="Building Logo" className="w-12 h-12 object-contain" />
                    <div>
                        <h2 className="text-xl font-bold tracking-wide">Building Management</h2>
                        <p className="text-sm text-gray-300">Reliable services since 1992</p>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 text-2xl">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition duration-300"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 transition duration-300"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition duration-300"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

