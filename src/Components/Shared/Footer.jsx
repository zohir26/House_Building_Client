import React from 'react';
import logo from '../../assets/logo.png'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <div className='container mx-auto '>
            <footer className="footer bg-base-200 text-base-content p-10">
  <aside>
<img src={logo}></img>
    <p>
      Building Management
      <br />
      Providing reliable building service since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <nav className=''>
    <h6 className="footer-title ">Social Links</h6>
    <div className='flex flex-col lg:flex-row gap-3  '>
    <a href='https://www.facebook.com/' className="link link-hover "><FaFacebook /></a>
    <a href='www.twitter.com' className="link link-hover"><FaXTwitter /> </a>
    <a href='www.linkedin.com' className="link link-hover "><FaLinkedin /></a>
    </div>
  </nav>

</footer>
        </div>
    );
};

export default Footer;