// Footer.jsx
import { Link } from 'react-router';
import { FaFacebook, FaPhone, FaEnvelope, FaWhatsapp, FaFacebookMessenger, FaLinkedin } from 'react-icons/fa';
import Logo from '../SharedComponents/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1: About or Logo */}
        <div className='space-y-4'>
          <Logo></Logo>
          <p>Your trusted platform for organizing and joining medical camps nationwide.</p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-blue-400  ">Home</Link></li>
            <li><Link to="/available" className="hover:text-blue-400 ">Available Camps</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400 ">Dashboard</Link></li>
            <li><Link to="/all-feedback" className="hover:text-blue-400 ">Feedback & Ratings</Link></li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div className='space-y-2'>
          <h4 className="font-semibold text-lg mb-2">Contact Us</h4>
          <p className="flex items-center gap-2"><FaPhone /> +880 1875 540 498</p>
          <p className="flex items-center gap-2"><FaEnvelope /> assalmanmuhammad@gmail.com</p>
          <div className="flex gap-3 mt-2 text-xl">
            <a href="https://www.facebook.com/share/16RXBkwd1V/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://m.me/sheikh.salman.257910" target="_blank" rel="noopener noreferrer"><FaFacebookMessenger /></a>
            <a href="https://wa.me/8801875540498" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="https://www.linkedin.com/in/sheikhsalman/" target="_blank" rel="noopener noreferrer"> <FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MediCamp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
