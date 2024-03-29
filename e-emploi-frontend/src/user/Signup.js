import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../constant";
import { isAvailableEmail, isAvailableUsername } from "../util/APIUtils";
const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [prenomError, setPrenomError] = useState("");
  const [nomError, setNomError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({
    prenom: "",
    nom: "",
    username: "",
    email: "",
    password: "",
    roleName:""
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await isAvailableEmail(user.email);
      if (!res.available) {
        setEmailError("Désolé, cet adresse email est déjà associé à un compte");
      }
    };

    const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    setEmailValid(EMAIL_REGEX.test(user.email));
    if (!user.email) {
      const errorMsg = "L'adresse email ne peut pas être vide";
      setEmailError(errorMsg);
    } else if (!emailValid && user.email.length < EMAIL_MAX_LENGTH) {
      let errorMsg = "Cet adresse email n'est pas valide";
      setEmailError(errorMsg);
    } else if (user.email.length > EMAIL_MAX_LENGTH) {
      const errorMsg = `Cet adresse email est trop long (Maximum ${EMAIL_MAX_LENGTH} caractères autorisés)`;
      setEmailError(errorMsg);
    } else {
      setEmailError("");
      fetchData();
    }
  }, [user.email, emailValid]);

  useEffect(() => {
    async function fetchData() {
      const res = await isAvailableUsername(user.username);
      if (!res.available) {
        setUsernameError(
          "Désolé, ce nom d'utilisateur est déjà associé à un compte"
        );
      }
    };
    fetchData();
  }, [user.username]);

  useEffect(() => {
    setEmailError("");
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const handleChange = (event, validateFun) => {
    handleInputChange(event);
    validateFun(event.target.value);
  };

  // Validation Functions

  const validateName = (name) => {
    if (name.length < NAME_MIN_LENGTH) {
      const errorMsg = `Nom trop court (Minimum ${NAME_MIN_LENGTH} caractères nécessaires)`;
      setNomError(errorMsg);
      return {
        validateStatus: "error",
        errorMsg: `Nom trop court (Minimum ${NAME_MIN_LENGTH} caractères nécessaires)`,
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      const errorMsg = `Nom trop long (Maximum ${NAME_MAX_LENGTH} caractères autorisés)`;
      setNomError(errorMsg);
      return {
        validationStatus: "error",
        errorMsg: `Nom trop long (Maximum ${NAME_MAX_LENGTH} caractères autorisés)`,
      };
    } else {
      setNomError(null);
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  const validatePrenom = () => {
    setPrenomError("");
  };

  const validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      const errorMsg = `Nom d'utilisateur trop court (Minimum ${USERNAME_MIN_LENGTH} caractères nécessaires)`;
      setUsernameError(errorMsg);
      return {
        validateStatus: "error",
        errorMsg: `Nom d'utilisateur trop court (Minimum ${USERNAME_MIN_LENGTH} caractères nécessaires)`,
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      const errorMsg = `Nom d'utilisateur trop long (Maximum ${USERNAME_MAX_LENGTH} caractères autorisés)`;
      setUsernameError(errorMsg);
      return {
        validationStatus: "error",
        errorMsg: `Nom d'utilisateur trop long (Maximum ${USERNAME_MAX_LENGTH} caractères autorisés)`,
      };
    } else {
      setUsernameError(null);
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  const validateEmail = (email) => {
    const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    setEmailValid(EMAIL_REGEX.test(email));
    if (!email) {
      const errorMsg = "L'adresse email ne peut pas être vide";
      setEmailError(errorMsg);
      return {
        validateStatus: "error",
        errorMsg: "L'adresse email ne peut pas être vide",
      };
    } else if (!emailValid && email.length < EMAIL_MAX_LENGTH) {
      let errorMsg = "Cet adresse email n'est pas valide";
      setEmailError(errorMsg);
      return {
        validateStatus: "error",
        errorMsg: "Cet adresse email n'est pas valide",
      };
    } else if (email.length > EMAIL_MAX_LENGTH) {
      const errorMsg = `Cet adresse email est trop long (Maximum ${EMAIL_MAX_LENGTH} caractères autorisés)`;
      setEmailError(errorMsg);
      return {
        validateStatus: "error",
        errorMsg: `Cet adresse email est trop long (Maximum ${EMAIL_MAX_LENGTH} caractères autorisés)`,
      };
    } else {
      setEmailError(null);
      return {
        validateStatus: null,
        errorMsg: null,
      };
    }
  };

  const validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      const errorMsg = `Mot de passe trop court (Minimum ${PASSWORD_MIN_LENGTH} caractères nécessaires)`;
      setPasswordError(errorMsg);
      return {
        validateStatus: "error",
        errorMsg: `Mot de passe trop court (Minimum ${PASSWORD_MIN_LENGTH} caractères nécessaires)`,
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      const errorMsg = `Mot de passe trop long (Maximum ${PASSWORD_MAX_LENGTH} caractères autorisés)`;
      setPasswordError(errorMsg);
      return {
        validationStatus: "error",
        errorMsg: `Mot de passe trop long (Maximum ${PASSWORD_MAX_LENGTH} caractères autorisés)`,
      };
    } else {
      setPasswordError(null);
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  const checkUsernameAvailability = async (e) => {
    e.preventDefault();
    const res = await isAvailableUsername(e.target.value);
    if (!res.available) {
      setUsernameError(
        "Désolé, ce nom d'utilisateur est déjà associé à un compte"
      );
    }
  };

  const checkEmailAvailability = async (e) => {
    e.preventDefault();
    const res = await isAvailableEmail(e.target.value);
    if (!res.available) {
      setEmailError("Désolé, cet adresse email est déjà associé à un compte");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-auto items-center">
      <div className="bg-inherit w-auto">
        <h1 className="text-3xl font-bold pb-6 text-center">
          Créer votre compte
        </h1>
        <div className="flex flex-col p-6 border rounded-md bg-white">
          <form
            onSubmit={(e) => onSignup(e, user, goToLogin)}
            className="flex flex-col  rounded-md bg-white"
          >
            <div className="flex pb-1">
              <div className="flex flex-col pr-5">
                <label className="font-bold text-gray-800 mb-2">Nom</label>
                <input
                  className="border border-gray-400 px-5 py-3 rounded-md outline-none focus:border-blue-600"
                  type="text"
                  name="nom"
                  id="nom"
                  value={user.nom}
                  onChange={(e) => handleChange(e, validateName)}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-gray-800 mb-2">Prénoms</label>
                <input
                  className="border border-gray-400 px-5 py-3 rounded-md outline-none focus:border-blue-600"
                  type="text"
                  name="prenom"
                  id="prenom"
                  value={user.prenom}
                  onChange={(e) => handleChange(e, validatePrenom)}
                />
              </div>
            </div>

            <p className="text-base text-red-600 bg-red-50 w-full mb-2 px-2">
              <span><ExclamationCircleIcon className="w-6 h-6 text-red-400"/></span>
              {nomError}
            </p>
            <p className="text-base text-red-600 bg-red-50 w-full mb-2 px-2">
              {prenomError}
            </p>

            <label className="font-bold text-gray-800 mb-2">
              Nom d'utilisateur
            </label>
            <input
              className="border border-gray-400 px-5 py-3 rounded-md outline-none focus:border-blue-600"
              type="text"
              name="username"
              id="username"
              value={user.username}
              onBlur={checkUsernameAvailability}
              onChange={(e) => handleChange(e, validateUsername)}
            />
            <p className="text-base text-red-600 bg-red-50 w-full mb-1 px-2">
              {usernameError}
            </p>
            <label className="font-bold text-gray-800 mb-2">Email</label>
            <input
              className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
              type="email"
              name="email"
              id="email"
              value={user.email}
             onBlur={checkEmailAvailability}
              onChange={(e) => handleChange(e, validateEmail)}
            />
            <p className="text-base text-red-600 bg-red-50 w-full mb-2 px-2">
              {emailError}
            </p>
            <label className="font-bold text-gray-800 mb-2">Mot de passe</label>
            <input
              className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(e) => handleChange(e, validatePassword)}
            />
            <p className="text-base text-red-600 bg-red-50 w-full mb-2 px-2">
              {passwordError}
            </p>
            <p className="mb-3">Critères sur le mot de passe ...</p>
            <button
              type="submit"
              className="text-white rounded-md font-bold py-3 hover:bg-blue-700 bg-blue-600"
            >
              Créer un compte
            </button>
          </form>
          <p className="text-center pt-5">OR</p>
          <div className="py-5 text-center">
            Sign up sur google et facebook ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
