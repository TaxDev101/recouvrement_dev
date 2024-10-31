import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const AppSearchBox = () => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <li className="nav-item">
      <div className="search-box">
        <form
          className="position-relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control search-input fuzzy-search"
            type="search"
            placeholder="Recherche..."
            aria-label="Search"
            defaultValue={inputValue}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <span className="search-box-icon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </form>

        {isInputFocused && (
          <>
            <div className="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none">
              <div
                className="btn-close-falcon"
                data-bs-dismiss="search"
                aria-label="Close"
                onClick={() => {
                  setInputValue("");
                  setInputFocused(false);
                }}
              ></div>
            </div>
            <div
              className={`dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100 ${
                isInputFocused ? "show" : ""
              }`}
            >
              <div
                className="scrollbar list py-3"
                style={{ maxHeight: "24rem" }}
              >
                <h6 className="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">
                  Recently Browsed
                </h6>
                <DropdownItem
                  href="app/events/event-detail.html"
                  title="Pages"
                  subtitle="Events"
                />
                <DropdownItem
                  href="app/e-commerce/customers.html"
                  title="E-commerce"
                  subtitle="Customers"
                />
                <hr className="bg-200 dark__bg-900" />
                <h6 className="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">
                  Suggested Filter
                </h6>
                <FilterItem
                  href="app/e-commerce/customers.html"
                  label="customers:"
                  title="All customers list"
                  badgeClass="badge-soft-warning"
                />
                <FilterItem
                  href="app/events/event-detail.html"
                  label="events:"
                  title="Latest events in current month"
                  badgeClass="badge-soft-success"
                />
                <FilterItem
                  href="app/e-commerce/product/product-grid.html"
                  label="products:"
                  title="Most popular products"
                  badgeClass="badge-soft-info"
                />
                <hr className="bg-200 dark__bg-900" />
                <h6 className="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">
                  Files
                </h6>
                <FileItem
                  href="#!"
                  imgSrc="assets/img/products/3-thumb.png"
                  imgAlt=""
                  title="iPhone"
                  author="Antony"
                  date="27 Sep at 10:30 AM"
                />
                <FileItem
                  href="#!"
                  imgSrc="assets/img/icons/zip.png"
                  imgAlt=""
                  title="Falcon v1.8.2"
                  author="John"
                  date="30 Sep at 12:30 PM"
                />
                <hr className="bg-200 dark__bg-900" />
                <h6 className="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">
                  Members
                </h6>
                <MemberItem
                  href="pages/user/profile.html"
                  imgSrc="assets/img/team/1.jpg"
                  name="Anna Karinina"
                  company="Technext Limited"
                />
                <MemberItem
                  href="pages/user/profile.html"
                  imgSrc="assets/img/team/2.jpg"
                  name="Antony Hopkins"
                  company="Brain Trust"
                />
                <MemberItem
                  href="pages/user/profile.html"
                  imgSrc="assets/img/team/3.jpg"
                  name="Emma Watson"
                  company="Google"
                />
              </div>
              <div className="text-center mt-n3">
                <p className="fallback fw-bold fs-1 d-none">No Result Found.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

const DropdownItem = ({ href, title, subtitle }) => (
  <a className="dropdown-item fs--1 px-card py-1 hover-primary" href={href}>
    <div className="d-flex align-items-center">
      <span className="fas fa-circle me-2 text-300 fs--2"></span>
      <div className="fw-normal title">
        {title}
        <span className="fas fa-chevron-right mx-1 text-500 fs--2"></span>
        {subtitle}
      </div>
    </div>
  </a>
);

const FilterItem = ({ href, label, title, badgeClass }) => (
  <a className="dropdown-item px-card py-1 fs-0" href={href}>
    <div className="d-flex align-items-center">
      <span
        className={`badge fw-medium text-decoration-none me-2 ${badgeClass}`}
      >
        {label}
      </span>
      <div className="text-truncate">{title}</div>
    </div>
  </a>
);

const FileItem = ({ href, imgSrc, imgAlt, title, author, date }) => (
  <a className="dropdown-item d-flex align-items-center" href={href}>
    <img className="rounded-2 me-2" src={imgSrc} alt={imgAlt} width="40" />
    <div>
      <h6 className="mb-0 fs--1">{title}</h6>
      <p className="fs--2 mb-0">{author}</p>
      <p className="fs--2 mb-0">{date}</p>
    </div>
  </a>
);

const MemberItem = ({ href, imgSrc, name, company }) => (
  <a className="dropdown-item d-flex align-items-center" href={href}>
    <img className="rounded-circle me-2" src={imgSrc} alt={name} width="40" />
    <div>
      <h6 className="mb-0 fs--1">{name}</h6>
      <p className="fs--2 mb-0">{company}</p>
    </div>
  </a>
);

export default AppSearchBox;
