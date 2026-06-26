import React from 'react';
// Contact details ke liye lucide-react ke icons active rakhe hain
import { Mail, Phone, MapPin } from "lucide-react";
// react-social-icons ko import kiya
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';

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
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Newsletter */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Join the ShopEase newsletter</h3>
            <p className="mt-1 text-sm text-gray-500">Get the latest deals and skincare tips, straight to your inbox.</p>
          </div>
          <form className="flex w-full max-w-md items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-colors focus:border-blue-400 focus:bg-white"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-[0.98]"
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
          <span className="text-2xl font-extrabold tracking-tight text-blue-600">ShopEase</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
            Your one-stop shop for premium skincare and beauty essentials. Quality products, delivered with ease.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" /> support@shopease.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" /> +1 (800) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" /> 123 Market St, New York, NY
            </li>
          </ul>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Shop</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {shopLinks.map((link) => (
              <li key={link}>
                <Link to="/shop" className="text-gray-500 transition-colors hover:text-blue-600">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Help</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {helpLinks.map((link) => (
              <li key={link}>
                <Link to="#" className="text-gray-500 transition-colors hover:text-blue-600">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Company</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {companyLinks.map((link) => (
              <li key={link}>
                <Link to="#" className="text-gray-500 transition-colors hover:text-blue-600">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          
          {/* Social Icons Container */}
          <div className="flex items-center gap-3">
            {socials.map(({ url, label }) => (
              <SocialIcon 
                key={label}
                url={url} 
                label={label}
                target="_blank" // Naye tab me open karne ke liye
                style={{ height: 35, width: 35 }} // Custom size set kiya
                className="hover:-translate-y-0.5 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;