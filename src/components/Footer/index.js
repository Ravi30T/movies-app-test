import {FaGoogle, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-main-container">
    <div className="footer-icons-container">
      <button type="button" className="footer-icon">
        <FaGoogle />
      </button>

      <button type="button" className="footer-icon">
        <FaTwitter />
      </button>

      <button type="button" className="footer-icon">
        <FaInstagram />
      </button>

      <button type="button" className="footer-icon">
        <FaYoutube />
      </button>
    </div>

    <div>
      <p className="contact-us"> Contact us </p>
    </div>
  </div>
)

export default Footer
