import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsis,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const roleLabels = {
  ROLE_ADMIN: "Administrateur",
  ROLE_AGENT: "Agent Centrale",
  ROLE_UNITE: "Unité Opérationnelle",
};

const AppUserDataTable = ({
  columns,
  data,
  titre = "",
  handleOpenModal,
  handleEditUser,
  handleDeleteUser,
}) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Modifiable
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    // Filtrer les données en fonction de la recherche
    let updatedData = data.filter((row) =>
      columns.some((column) =>
        row[column.key]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );

    // Appliquer le tri si une configuration de tri est définie
    if (sortConfig.key) {
      updatedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(updatedData);
  }, [search, data, columns, sortConfig]);

  // Calcule le nombre total de pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Obtenir les données de la page actuelle
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors de la recherche
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de nombre d'éléments par page
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="card mb-3" id="customersTable">
      <div className="card-header">
        <div className="row flex-between-center">
          <div className="col-6 col-sm-auto d-flex align-items-center pe-0">
            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">{titre}</h5>
            <button
              onClick={handleOpenModal}
              className="btn btn-falcon-default btn-sm mx-2"
            >
              <FontAwesomeIcon icon={faPlus} className="me-1" />
              Créer
            </button>
          </div>
          <div className="col-6 col-sm-auto text-end ps-2">
            <div
              id="table-customers-replace-element"
              className="d-flex align-items-center"
            >
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={handleSearch}
                className="form-control form-control-sm mx-2"
                style={{ maxWidth: "150px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
            <thead className="bg-200 text-900">
              {data.length > 0 ? (
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="sort pe-1 align-middle white-space-nowrap"
                      onClick={() => requestSort(column.key)}
                      style={{ cursor: "pointer" }} // Indiquer que c'est cliquable
                    >
                      {column.label}
                      {sortConfig.key === column.key
                        ? sortConfig.direction === "ascending"
                          ? "▲"
                          : "▼"
                        : null}
                    </th>
                  ))}
                  <th className="align-middle no-sort"></th>
                </tr>
              ) : (
                <tr>
                  <th
                    colSpan={columns.length + 1}
                    className="text-center py-4" // Centrage avec padding
                  >
                    Aucune donnée disponible
                  </th>
                </tr>
              )}
            </thead>
            <tbody className="list" id="table-customers-body">
              {data.length > 0 &&
                currentData.map((row, index) => (
                  <tr key={index} className="btn-reveal-trigger">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${column.key} align-middle py-2`}
                      >
                        {column.key === "roles"
                          ? row[column.key]
                              .filter((role) => role !== "ROLE_USER") // Exclure ROLE_USER
                              .map((role) => roleLabels[role] || role)
                              .join(", ")
                          : row[column.key]}
                      </td>
                    ))}
                    <td className="align-middle white-space-nowrap py-2 text-end">
                      <div className="dropdown font-sans-serif position-static">
                        <button
                          className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal"
                          type="button"
                          id={`customer-dropdown-${index}`}
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end border py-0"
                          aria-labelledby={`customer-dropdown-${index}`}
                        >
                          <div className="bg-white rounded-2 py-2">
                            <a
                              className="dropdown-item cursor-pointer"
                              onClick={() => handleEditUser(row)}
                            >
                              Editer
                            </a>
                            <a
                              className="dropdown-item text-danger cursor-pointer"
                              onClick={() => handleDeleteUser(row.id)}
                            >
                              Supprimer
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="d-flex justify-content-between p-3">
          {/* Filtre pour le nombre de lignes */}
          <div className="d-flex align-items-center w-full">
            <span className="me-2">Lignes:</span>
            <select
              className="form-select form-select-sm"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn btn-sm btn-falcon-default me-1"
              type="button"
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <ul className="pagination mb-0">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`${currentPage === pageNumber ? "active" : ""}`}
                  >
                    <button
                      className="page btn btn-sm btn-falcon-default ms-1"
                      onClick={() => handlePageClick(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                )
              )}
            </ul>
            <button
              className="btn btn-sm btn-falcon-default ms-1"
              type="button"
              disabled={currentPage === totalPages}
              onClick={nextPage}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppUserDataTable;
