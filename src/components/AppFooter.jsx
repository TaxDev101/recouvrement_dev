import React from "react";

const AppFooter = () => {
  return (
    <footer className="footer">
      <div className="row g-0 justify-content-between fs--1 mt-4 mb-3">
        <div className="col-12 col-sm-auto text-center">
          <p className="mb-0 text-600">
            Gestion des Restes à Recouvrer
            <span className="d-none d-sm-inline-block">|</span>
            <br className="d-sm-none" /> {new Date().getFullYear()} &copy;{" "}
            <a href="https://impot.mg">DGI</a>
          </p>
        </div>
        <div className="col-12 col-sm-auto text-center">
          <p className="mb-0 text-600">v1.0</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
