import "../../../css/filterCategory.css";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const FilterCategory = ({ type, img, artisanId, serviceId }) => {
  const handleRedirect = async (event) => {
    //get the service id when the event it triggered
    let artisanId = event.target.getAttribute("artisanId");
    let serviceId = event.target.getAttribute("serviceId");

    localStorage.setItem("serviceId-book", serviceId);
    localStorage.setItem("artisanId-book", artisanId);

    window.location.href = "/auth/customer/book-service";
    // navigate("/auth/customer/book-service");
  };

  return (
    <div className="filter-category-container">
      <div className="filter-category-card">
        <LazyLoad className="filter-category-card-img" threshold={0.95}>
          <img
            className="filter-category-card-img"
            src={
              process.env.REACT_APP_API_URL_PRO +
              "/auth/fetch-user-profile/" +
              img
            }
            alt={img}
          />
        </LazyLoad>
        <div className="filter-category-card-info">
          <h3>{type}</h3>

          <Link
            to="#"
            onClick={handleRedirect}
            artisanId={artisanId}
            serviceId={serviceId}
            style={{ textDecoration: "none" }}
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
