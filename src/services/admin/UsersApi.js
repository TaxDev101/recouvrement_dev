import axios from "axios";

const API_URL = "http://localhost:8000/api/admin/users";

function findAll() {
  return axios
    .get(API_URL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      throw error;
    });
}

function saveUser(user) {
  return axios
    .post(API_URL, user)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error
      );
      throw error;
    });
}

function editUser(id, user) {
  return axios
    .put(`${API_URL}/${id}`, user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      throw error;
    });
}

function deleteUser(id) {
  return axios
    .delete(`${API_URL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      throw error;
    });
}

export default { findAll, saveUser, editUser, deleteUser };
