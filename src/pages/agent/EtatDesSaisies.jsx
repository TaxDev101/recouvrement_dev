import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { French } from "flatpickr/dist/l10n/fr.js";
import crmBarChart from "../../assets/images/generic/crm-bar-chart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import crmLineChart from "../../assets/images/generic/crm-line-chart.png";
import { AppPaginatedTable } from "../../components/index.js";
import { useState } from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const EtatDesSaisies = () => {
  const [dateRange, setDateRange] = useState([
    new Date("2024-09-12"),
    new Date("2024-09-20"),
  ]);
  const data = [
    {
      id: 1,
      etat: "validé",
      date: "2024-09-30",
      unite_operationnelle: {
        nom: "UO 1",
        dri: {
          code: 5262,
          libele: "DRI 1",
        },
      },
    },
    {
      id: 2,
      etat: "non validé",
      date: "",
      unite_operationnelle: {
        nom: "UO 2",
        dri: {
          code: 5262,
          libele: "DRI 2",
        },
      },
    },
    {
      id: 3,
      etat: "Non validé",
      date: "",
      unite_operationnelle: {
        nom: "UO 3",
        dri: {
          code: 5262,
          libele: "DRI 3",
        },
      },
    },
  ];

  // Colonnes à afficher
  const columns = [
    { key: "dri", label: "DRI" },
    { key: "unite_operationnelle", label: "Unités Opérationnelles" },
    { key: "etat", label: "Etat" },
    { key: "date_validation", label: "Date de Validation" },
  ];
  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <div className="card bg-100 shadow-none border">
            <div className="row gx-0 flex-between-center">
              <div className="col-sm-auto d-flex align-items-center">
                <img className="ms-n2" src={crmBarChart} alt="" width="90" />
                <div>
                  <h6 className="text-primary fs--1 mb-0">Agent Central</h6>
                  <h4 className="text-primary fw-bold mb-0">
                    État des{" "}
                    <span className="text-info fw-medium">Saisies</span>
                  </h4>
                </div>
                <img
                  className="ms-n4 d-md-none d-lg-block"
                  src={crmLineChart}
                  alt=""
                  width="150"
                />
              </div>
              <div className="col-md-auto p-3">
                <form className="row align-items-center g-3">
                  <div className="col-auto">
                    <h6 className="text-700 mb-0">
                      Affichage des données pour:{" "}
                    </h6>
                  </div>
                  <div className="col-md-auto position-relative">
                    <Flatpickr
                      className="form-control form-control-sm datetimepicker ps-4"
                      id="CRMDateRange"
                      value={dateRange}
                      onChange={(date) => setDateRange(date)}
                      options={{
                        mode: "range",
                        dateFormat: "d M",
                        disableMobile: true,
                        locale: French,
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-primary position-absolute top-50 translate-middle-y ms-2"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppPaginatedTable
        data={data.map((item) => ({
          id: item.id,
          dri: item.unite_operationnelle.dri.libele,
          unite_operationnelle: item.unite_operationnelle.nom,
          etat: item.etat,
          date_validation: item.date ? item.date : "non renseigné",
        }))}
        columns={columns}
        initialItemsPerPage={5}
        title="Unité Opérationnelle: 003/113"
        linkColumn={{
          key: "unite_operationnelle",
          link: (item) => `/restes-par-uo/${item.id}`,
        }}
      />
    </>
  );
};

export default EtatDesSaisies;
