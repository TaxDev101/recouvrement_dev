import profil from "../assets/images/avatar/avatar.png";
import AuthApi from "../services/auth/AuthApi.js";

const AppProfile = ({ handleLogout }) => {
  const connectedUser = AuthApi.getUser();
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link pe-0"
        id="navbarDropdownUser"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="avatar avatar-xl">
          <img className="rounded-circle" src={profil} alt="" />
        </div>
      </a>
      <div
        className="dropdown-menu dropdown-menu-end py-0"
        aria-labelledby="navbarDropdownUser"
      >
        <div className="bg-white dark__bg-1000 rounded-2 py-2">
          <a className="dropdown-item fw-bold text-warning" href="#!">
            <span className="fas fa-crown me-1"></span>
            <span>{connectedUser && connectedUser.username}</span>
          </a>

          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#!">
            Paramètres
          </a>
          <a className="dropdown-item" href="pages/user/profile.html">
            Aide?
          </a>

          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>
    </li>
  );
};

export default AppProfile;
