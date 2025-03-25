
import React from "react";

export default function Carousel({ setSearch }) {
  return (
    <div className="position-relative">
      {/* Search Form - Adjusted Positioning */}
      <div className="position-absolute w-100 d-flex justify-content-center" 
           style={{ bottom: "20px", left: "0", zIndex: "10" }}>
        <form className="d-flex w-75 w-md-50">
          <input 
            className="form-control me-2 flex-grow-1" 
            type="search" 
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "400px" }}
          />
          <button className="btn btn-success px-3" type="submit">Search</button>
        </form>
      </div>

      {/* Responsive Carousel with Reduced Height */}
      <div id="carouselExampleFade" 
           className="carousel slide carousel-fade" 
           data-bs-ride="carousel"
           style={{ maxHeight: "400px", overflow: "hidden" }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/ai2.png" className="d-block w-100 img-fluid" alt="Slide 1" style={{ height: "400px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src="/ai4.png" className="d-block w-100 img-fluid" alt="Slide 2" style={{ height: "400px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src="/ai3.png" className="d-block w-100 img-fluid" alt="Slide 3" style={{ height: "400px", objectFit: "cover" }} />
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}