import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="footer">
        <div className="container-fluid p-0">
          <div className="row row-cols-1 row-cols-lg-4 m-0">
            <div className="col-12 col-lg-4 p-0 footer__left">
              <img src={require("../../assets/img/riven_logo.png")} alt="" />
              <p>Find events you love with our</p>
              <img src={require("../../assets/img/sosmed_group.png")} alt="" />
            </div>
            <div className="col-12 col-lg-2 d-flex flex-column p-0 footer__riven">
              <h5>Riven</h5>
              <div className="d-flex flex-wrap flex-row flex-md-column riven__link">
                <a href="" className="text-decoration-none">
                  About Us
                </a>
                <a href="" className="text-decoration-none">
                  Features
                </a>
                <a href="" className="text-decoration-none">
                  Blog
                </a>
                <a href="" className="text-decoration-none">
                  Payments
                </a>
                <a href="" className="text-decoration-none">
                  Mobile App
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-2 d-flex flex-column p-0 features">
              <h5>Features</h5>
              <div className="d-flex flex-wrap flex-row flex-md-column features__link">
                <a href="" className="text-decoration-none">
                  Booking
                </a>
                <a href="" className="text-decoration-none">
                  Create Event
                </a>
                <a href="" className="text-decoration-none">
                  Discover
                </a>
                <a href="" className="text-decoration-none">
                  Register
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-2 d-flex flex-column p-0 company">
              <h5>Company</h5>
              <div className="d-flex flex-wrap flex-row flex-md-column company__link">
                <a href="" className="text-decoration-none">
                  Partnership
                </a>
                <a href="" className="text-decoration-none">
                  Help
                </a>
                <a href="" className="text-decoration-none">
                  Term of Service
                </a>
                <a href="" className="text-decoration-none">
                  Privacy Policy
                </a>
                <a href="" className="text-decoration-none">
                  Sitemap
                </a>
              </div>
            </div>
            <small className="d-flex justify-content-lg-center copyright">
              © 2022 Riven. All Rights Reserved.
            </small>
          </div>
        </div>
      </footer>
    </>
  );
}
