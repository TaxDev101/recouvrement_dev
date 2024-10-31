import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgShape from "../../assets/images/generic/bg-shape.png";
import shape from "../../assets/images/generic/shape-1.png";
import AuthContext from "../../contexts/AuthContext.jsx";
import { toast } from "react-toastify";
import AuthApi from "../../services/auth/AuthApi.js";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };
  const { setIsAuthenticated } = useContext(AuthContext);

  // Gestion du submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AuthApi.authenticate(credentials);
      const userRole = AuthApi.getUserRole();

      setError("");
      setIsAuthenticated(true);
      toast.info("Vous êtes connecté 😃");

      if (userRole.includes("ROLE_ADMIN")) {
        navigate("/admin/tableau-de-bord");
      } else if (userRole.includes("ROLE_USER")) {
        navigate("/agent/tableau-de-bord");
      } else {
        navigate("/");
      }
    } catch (errors) {
      setError("Identifiants Invalides");
      toast.error("Identifiants Invalides");
    }
  };
  return (
    <div className="main-container-fluid" id="top">
      <div className="row min-vh-100 flex-center g-0">
        <div className="col-lg-8 col-xxl-5 py-3 position-relative">
          <img
            className="bg-auth-circle-shape"
            src={bgShape}
            alt=""
            width="250"
          />
          <img
            className="bg-auth-circle-shape-2"
            src={shape}
            alt=""
            width="150"
          />
          <div className="card overflow-hidden z-index-1">
            <div className="card-body p-0">
              <div className="row g-0 h-100">
                <div className="col-md-5 text-center bg-card-gradient">
                  <div className="position-relative p-4 pt-md-5 pb-md-7 light">
                    <div
                      className="bg-holder bg-auth-card-shape"
                      style={{
                        backgroundImage: `url(./../assets/images/generic/half-circle.png)`,
                      }}
                    ></div>

                    <div className="z-index-1 position-relative">
                      <Link
                        className="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder"
                        to="/"
                      >
                        RAR
                      </Link>
                      <p className="opacity-75 text-white">
                        Application de collecte, de consolidation et de
                        restitution de la situation des restes à recouvrer des
                        unités opérationnelles.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                    <p className="text-white">
                      Vous n'avez pas de compte?
                      <br />
                      <a
                        className="text-decoration-underline link-light"
                        href="../../../pages/authentication/card/register.html"
                      >
                        Inscription
                      </a>
                    </p>
                    <p className="mb-0 mt-4 mt-md-5 fs--1 fw-semi-bold text-white opacity-75">
                      Lire les{" "}
                      <a
                        className="text-decoration-underline text-white"
                        href="#!"
                      >
                        termes
                      </a>{" "}
                      et les{" "}
                      <a
                        className="text-decoration-underline text-white"
                        href="#!"
                      >
                        conditions
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-7 d-flex flex-center">
                  <div className="p-4 p-md-5 flex-grow-1">
                    <div className="row flex-between-center">
                      <div className="col-auto">
                        <h3>Page de Connexion</h3>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="card-email">
                          Email
                        </label>
                        <input
                          value={credentials.email}
                          onChange={handleChange}
                          onFocus={() => setError("")}
                          onBlur={() => setError("")}
                          className={"form-control" + (error && " is-invalid")}
                          id="card-email"
                          type="email"
                          name="email"
                        />
                        {/* {error && (
                          <div className="invalid-feedback">{error}</div>
                        )} */}
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <label className="form-label" htmlFor="card-password">
                            Mot de passe
                          </label>
                        </div>
                        <input
                          value={credentials.password}
                          onChange={handleChange}
                          onFocus={() => setError("")}
                          onBlur={() => setError("")}
                          className={"form-control" + (error && " is-invalid")}
                          id="card-password"
                          type="password"
                          name="password"
                        />
                        {/* {error && (
                          <div className="invalid-feedback">{error}</div>
                        )} */}
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="col-auto">
                          <a
                            className="fs--1"
                            href="../../../pages/authentication/card/forgot-password.html"
                          >
                            Mot de Passe oublié?
                          </a>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-block w-100 mt-3"
                          type="submit"
                          name="submit"
                        >
                          Se connecter
                        </button>
                      </div>
                    </form>
                    <div className="position-relative mt-4">
                      <hr className="bg-300" />
                      <div className="divider-content-center">
                        ou se connecter avec
                      </div>
                    </div>
                    <div className="row g-2 mt-2">
                      <div className="col-sm-6">
                        <a
                          className="btn btn-outline-google-plus btn-sm d-block w-100"
                          href="#"
                        >
                          <span
                            className="fab fa-google-plus-g me-2"
                            data-fa-transform="grow-8"
                          ></span>{" "}
                          google
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <a
                          className="btn btn-outline-facebook btn-sm d-block w-100"
                          href="#"
                        >
                          <span
                            className="fab fa-facebook-square me-2"
                            data-fa-transform="grow-8"
                          ></span>{" "}
                          facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
