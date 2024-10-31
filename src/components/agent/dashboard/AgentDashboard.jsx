import React from "react";

const TauxDeRecouvrement = React.lazy(() => import("./TauxDeRecouvrement.jsx"));
const LineChart = React.lazy(() => import("./LineChart.jsx"));

const AgentDashboard = () => {
  return (
    <>
      <LineChart />
      <div className="col-md-6 col-xxl-3">
        <div className="card h-md-100 ecommerce-card-min-width">
          <div className="card-header pb-0">
            <h6 className="mb-0 mt-2 d-flex align-items-center">
              Taux de Recouvrements
              <span
                className="ms-1 text-400"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Calculated according to last week's sales"
              >
                <span
                  className="far fa-question-circle"
                  data-fa-transform="shrink-1"
                ></span>
              </span>
            </h6>
          </div>
          <div className="card-body d-flex flex-column justify-content-end">
            <div className="row">
              <div className="col">
                <p className="font-sans-serif lh-1 mb-1 fs-4">47K Ar</p>
                <span className="badge badge-soft-success rounded-pill fs--2">
                  +3.5%
                </span>
              </div>
              <div className="col-auto ps-0">
                <div className="echart-bar-weekly-sales h-100">
                  <TauxDeRecouvrement />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-xxl-3">
        <div className="card h-md-100">
          <div className="card-header pb-0">
            <h6 className="mb-0 mt-2">Total Créance</h6>
          </div>
          <div className="card-body d-flex flex-column justify-content-end">
            <div className="row justify-content-between">
              <div className="col-auto align-self-end">
                <div className="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
                  58.4K
                </div>
                <span className="badge rounded-pill fs--2 bg-200 text-primary">
                  <span className="fas fa-caret-up me-1"></span>13.6%
                </span>
              </div>
              <div className="col-auto ps-0 mt-n4">
                <div
                  className="echart-default-total-order"
                  data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 4","Week 5","week 6","week 7"]},"series":[{"type":"line","data":[20,40,100,120],"smooth":true,"lineStyle":{"width":3}}],"grid":{"bottom":"2%","top":"2%","right":"10px","left":"10px"}}'
                  data-echart-responsive="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentDashboard;
