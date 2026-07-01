import React from 'react';
// Contact details ke liye lucide-react ke icons active rakhe hain
import { Mail, Phone, MapPin } from "lucide-react";
// react-social-icons ko import kiya
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../Store/ThemeProvider';


const shopLinks = ["Skin Care", "Makeup", "Fragrances", "Hair Care", "New Arrivals"];
const helpLinks = ["Contact Us", "Shipping & Returns", "Track Order", "FAQs", "Size Guide"];
const companyLinks = ["About Us", "Careers", "Privacy Policy", "Terms of Service", "Blog"];

// Socials array ko simplify kiya URLs ke saath
const socials = [
  { url: "https://facebook.com", label: "Facebook" },
  { url: "https://instagram.com", label: "Instagram" },
  { url: "https://twitter.com", label: "Twitter" },
  { url: "https://youtube.com", label: "YouTube" },
];

const Footer = () => {
   const { theme } = useContext(ThemeContext);

  return (
    <footer className={`border-t ${theme == 'light' ? "border-gray-200 bg-white" : "border-gray-700 bg-gray-900"}`}>
      {/* Newsletter */}
      <div className={`border-b ${theme == 'light' ? "border-gray-100" : "border-gray-800"}`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row md:text-left">
          <div>
            <h3 className={`text-lg font-bold ${theme == 'light' ? "text-gray-900" : "text-[#F7F7F7]"}`}>Join the ShopEase newsletter</h3>
            <p className={`mt-1 text-sm ${theme == 'light' ? "text-gray-500" : "text-gray-400"}`}>Get the latest deals and skincare tips, straight to your inbox.</p>
          </div>
          <form className="flex w-full max-w-md items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className={`h-11 w-full rounded-full border px-4 text-sm outline-none transition-colors ${theme == 'light' ? "border-gray-200 bg-gray-50 text-gray-700 focus:border-blue-400 focus:bg-white" : "border-gray-700 bg-gray-800 text-[#F7F7F7] focus:border-blue-500 focus:bg-gray-700"}`}
            />
            <button
              type="submit"
              className={`h-11 shrink-0 rounded-full px-6 text-sm font-semibold transition-colors ${theme == 'light' ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 lg:grid-cols-5">
        {/* Brand Details */}
        <div className="col-span-2">
          <span className={`text-2xl font-extrabold tracking-tight ${theme == 'light' ? "text-blue-600" : "text-blue-400"}`}>ShopEase</span>
          <p className={`mt-3 max-w-xs text-sm leading-relaxed ${theme == 'light' ? "text-gray-500" : "text-gray-400"}`}>
            Your one-stop shop for premium skincare and beauty essentials. Quality products, delivered with ease.
          </p>
          <ul className={`mt-4 space-y-2 text-sm ${theme == 'light' ? "text-gray-500" : "text-gray-400"}`}>
            <li className="flex items-center gap-2">
              <Mail className={`h-4 w-4 ${theme == 'light' ? "text-blue-600" : "text-blue-400"}`} /> support@shopease.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className={`h-4 w-4 ${theme == 'light' ? "text-blue-600" : "text-blue-400"}`} /> +1 (800) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin className={`h-4 w-4 ${theme == 'light' ? "text-blue-600" : "text-blue-400"}`} /> 123 Market St, New York, NY
            </li>
          </ul>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className={`text-sm font-semibold ${theme == 'light' ? "text-gray-900" : "text-[#F7F7F7]"}`}>Shop</h4>
          <ul className={`mt-4 space-y-3 text-sm`}>
            {shopLinks.map((link) => (
              <li key={link}>
                <Link to="/shop" className={`transition-colors ${theme == 'light' ? "text-gray-500 hover:text-blue-600" : "text-gray-400 hover:text-blue-400"}`}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h4 className={`text-sm font-semibold ${theme == 'light' ? "text-gray-900" : "text-[#F7F7F7]"}`}>Help</h4>
          <ul className={`mt-4 space-y-3 text-sm`}>
            {helpLinks.map((link) => (
              <li key={link}>
                <Link to="#" className={`transition-colors ${theme == 'light' ? "text-gray-500 hover:text-blue-600" : "text-gray-400 hover:text-blue-400"}`}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className={`text-sm font-semibold ${theme == 'light' ? "text-gray-900" : "text-[#F7F7F7]"}`}>Company</h4>
          <ul className={`mt-4 space-y-3 text-sm`}>
            {companyLinks.map((link) => (
              <li key={link}>
                <Link to="#" className={`transition-colors ${theme == 'light' ? "text-gray-500 hover:text-blue-600" : "text-gray-400 hover:text-blue-400"}`}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={`border-t ${theme == 'light' ? "border-gray-100" : "border-gray-800"}`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className={`text-xs ${theme == 'light' ? "text-gray-400" : "text-gray-500"}`}>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          
          {/* Social Icons Container */}
          <div className="flex items-center gap-3">
            {socials.map(({ url, label }) => (
              <SocialIcon 
                key={label}
                url={url} 
                label={label}
                target="_blank" // Naye tab me open karne ke liye
                style={{ height: 35, width: 35 }} // Custom size set kiya
                className={`hover:-translate-y-0.5 transition-transform duration-200 ${theme == 'dark' ? 'bg-gray-800' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;