import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Company</h5>
            <ul className="nav flex-column">
              {[
                "About Us",
                "Careers",
                "Press",
                "Blog",
                "Contact"
              ].map((item, idx) => (
                <li key={idx} className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-light opacity-75 hover-opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Support</h5>
            <ul className="nav flex-column">
              {[
                "Help Center",
                "FAQs",
                "Terms of Service",
                "Privacy Policy",
                "Report Issue"
              ].map((item, idx) => (
                <li key={idx} className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-light opacity-75 hover-opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Quick Links</h5>
            <ul className="nav flex-column">
              {["Home", "Services", "Pricing", "Testimonials", "Contact"].map((item, idx) => (
                <li key={idx} className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-light opacity-75 hover-opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row text-center text-md-start">
          <div className="col-md-6 mb-4">
            <h5 className="text-uppercase fw-bold">Newsletter</h5>
            <p className="opacity-75">Stay updated with our latest news and offers.</p>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <input type="email" className="form-control" placeholder="Your email" />
              <button className="btn btn-success">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center py-4 mt-4 border-top border-secondary">
          <p className="mb-0 text-center text-sm-start">© {new Date().getFullYear()} Company, Inc. All rights reserved.</p>
          <div className="d-flex gap-3">
            {["facebook", "twitter", "instagram"].map((icon, index) => (
              <a key={index} href="#" className="text-light opacity-75 hover-opacity-100 fs-4">
                <i className={`bi bi-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
