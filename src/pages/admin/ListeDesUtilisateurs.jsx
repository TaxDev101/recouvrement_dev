import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "flatpickr/dist/flatpickr.min.css";
import { French } from "flatpickr/dist/l10n/fr.js";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";
import crmBarChart from "../../assets/images/generic/crm-bar-chart.png";
import crmLineChart from "../../assets/images/generic/crm-line-chart.png";
import AppUserDataTable from "../../components/admin/AppUserDataTable.jsx";
import { v4 as uuidv4 } from "uuid";
import AppInputField from "../../components/AppInputField.jsx";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "react-confirm-alert/src/react-confirm-alert.css";
import UsersApi from "../../services/admin/UsersApi.js";
const ListeDesUtilisateurs = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [dateRange, setDateRange] = useState([
    new Date("2024-09-12"),
    new Date("2024-09-20"),
  ]);

  const [selectedUser, setSelectedUser] = useState({
    email: "",
    roles: [""],
    password: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUserRole, setNewUserRole] = useState("ROLE_AGENT");
  const [errors, setErrors] = useState();

  const columns = [
    { key: "id", label: "# Id" },
    { key: "email", label: "Email" },
    { key: "roles", label: "Rôles" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const utilisateurs = await UsersApi.findAll();
      setUsers(utilisateurs);
    } catch (error) {
      toast.error("Erreur lors de la récupération des données!");
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Enregistrement et modification de l'utilisateur
  const handleSave = async () => {
    if (isEditMode) {
      // Vérifiez si selectedUser.id est défini avant la mise à jour
      if (selectedUser.id) {
        try {
          const updatedUser = await UsersApi.editUser(
            selectedUser.id,
            selectedUser
          );
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          toast.info("Utilisateur mis à jour avec succès 😃");
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour de l'utilisateur :",
            error
          );
          toast.error("Erreur lors de la mise à jour de l'utilisateur");
        }
      }
    } else {
      // Code pour ajouter un nouvel utilisateur
      try {
        const newUser = await UsersApi.saveUser(selectedUser);
        setUsers((prevUsers) => [...prevUsers, newUser]);
        toast.info("Nouvel utilisateur ajouté avec succès 😃");
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        toast.error("Erreur lors de l'ajout de l'utilisateur");
      }
    }
    fetchUsers();
    handleCloseModal();
  };

  // Suppression de l'utilisateur
  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
      customClass: {
        confirmButton: "btn btn-sm btn-danger",
        cancelButton: "btn btn-sm btn-secondary",
      },
    });

    if (result.isConfirmed) {
      try {
        await UsersApi.deleteUser(userId);

        // Mise à jour de la liste des utilisateurs localement
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        // Rechargement de la liste complète des utilisateurs depuis le serveur
        fetchUsers();

        // Notification de succès
        toast.info("L’utilisateur a été supprimé avec succès 😃");
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
        toast.error("Une erreur s'est produite 😟");
      }
    }
  };

  // Fonctions pour le modal
  const handleOpenModal = (role = "ROLE_AGENT") => {
    setSelectedUser({ email: "", roles: role ? [role] : [], password: "" }); // Réinitialise l'utilisateur sélectionné
    setIsEditMode(false);
    setNewUserRole(role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser({ email: "", roles: [""], password: "" });
    setIsEditMode(false);
  };

  // Filtrer les utilisateurs par rôle
  const agentUsers = users.filter(
    (user) => user.roles && user.roles.includes("ROLE_AGENT")
  );
  const uniteUsers = users.filter(
    (user) => user.roles && user.roles.includes("ROLE_UNITE")
  );
  const adminUsers = users.filter(
    (user) => user.roles && user.roles.includes("ROLE_ADMIN")
  );

  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <div className="card bg-100 shadow-none border">
            <div className="row gx-0 flex-between-center">
              <div className="col-sm-auto d-flex align-items-center">
                <img className="ms-n2" src={crmBarChart} alt="" width="90" />
                <div>
                  <h6 className="text-primary fs--1 mb-0">Administration </h6>
                  <h4 className="text-primary fw-bold mb-0">
                    Gestion des{" "}
                    <span className="text-info fw-medium">Utilisateurs</span>
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
      {/* Section pour afficher les Administrateurs en dessus */}
      <div className="row mb-2">
        <div className="col-md-12">
          <AppUserDataTable
            columns={columns}
            data={adminUsers}
            titre="Administrateur"
            handleOpenModal={() => handleOpenModal("ROLE_ADMIN")}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
      {/* Section pour afficher Agent et Unité côte à côte */}
      <div className="row">
        <div className="col-md-6">
          <AppUserDataTable
            columns={columns}
            data={agentUsers}
            titre="Agent Centrale"
            handleOpenModal={() => handleOpenModal("ROLE_AGENT")}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
        <div className="col-md-6">
          <AppUserDataTable
            columns={columns}
            data={uniteUsers}
            titre="Unité Opérationnelle"
            handleOpenModal={() => handleOpenModal("ROLE_UNITE")}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" top="true">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode
              ? "Modifier l'utilisateur"
              : "Ajouter un nouveau utilisateur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row g-3">
              <div className="mb-3 col-md-6">
                <AppInputField
                  label="Adresse e-mail:"
                  id={`email-${uuidv4()}`}
                  type="email"
                  value={selectedUser?.email || ""}
                  placeholder="exemple@domaine.com"
                  onChange={(e) =>
                    setSelectedUser((prevUser) => ({
                      ...prevUser,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Champ de mot de passe : affiché uniquement en mode ajout */}
              {!isEditMode ? (
                <div className="mb-3 col-md-6">
                  <AppInputField
                    label="Mot de passe:"
                    id={`password-${uuidv4()}`}
                    type="password"
                    value={selectedUser?.password || ""}
                    placeholder="mot de passe"
                    onChange={(e) =>
                      setSelectedUser((prevUser) => ({
                        ...prevUser,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              ) : (
                <>
                  {/* Sélection - prend toute la ligne en mode édition, sinon la moitié */}
                  <div
                    className={`mb-3 ${isEditMode ? "col-md-6" : "col-md-12"}`}
                  >
                    <label className="col-form-label" htmlFor="roles">
                      Rôles
                    </label>
                    <select
                      className="form-select form-select-sm"
                      aria-label="Sélectionner le rôle de l'utilisateur"
                      id="roles"
                      value={selectedUser?.roles[0] || "ROLE_UNITE"}
                      onChange={(e) =>
                        setSelectedUser((prevUser) => ({
                          ...prevUser,
                          roles: [e.target.value],
                        }))
                      }
                    >
                      <option value="ROLE_UNITE">Unité Opérationnelle</option>
                      <option value="ROLE_AGENT">Agent Centrale</option>
                      <option value="ROLE_ADMIN">Administrateur</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            {!isEditMode && (
              <input type="hidden" name="roles" value={newUserRole} />
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="btn btn-sm"
          >
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSave} className="btn btn-sm">
            {isEditMode ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListeDesUtilisateurs;
