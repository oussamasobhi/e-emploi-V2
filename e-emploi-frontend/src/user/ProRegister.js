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
import { getAllSousCatagorie, getCategories, getSousCategories, isAvailableEmail, isAvailableUsername, proSignup } from "../util/APIUtils";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { message } from "antd";
import { Link } from "react-router-dom";
import Souscat from "./Souscat";
import { BugReportTwoTone } from "@mui/icons-material";
const ProRegister = () => {
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
    password2: "",
    isPRO: true,
    num_tel:"",
    CIN: "",
    competences:[]
  });
  const [competence, setCompetence] = useState({
    categorie:"",
    souscategorie:[],
    souscategorie2:[]
  })
  const [categorie, setCategorie] = useState(null);
  const [sousCategorie, setSousCategorie] = useState(null);
  useEffect(() => {
    setEmailError("");
    const loadCategorie = async () => {
        try{
            const res = await getCategories();
            setCategorie(res);
        }catch(error){
            console.log(error)
        }
    }
    loadCategorie();    
    const loadSousCategorie = async () => {
      try{
          const res = await getAllSousCatagorie();
          setSousCategorie(res);
      }catch(error){
          console.log(error)
      }
  };
  loadSousCategorie();
  }, [])
  useEffect(() => {
    console.log(categorie)
  }, [categorie])
  
  
  useEffect(() => {
   console.log(categorie)
  }, [categorie]);
  useEffect(() => {

    console.log(sousCategorie)
   }, [sousCategorie]);
 
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await isAvailableEmail(user.email);
      if (!res.available) {
        setEmailError("Désolé, cet adresse email est déjà associé à un compte");
      }
    };

    const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    setEmailValid(EMAIL_REGEX.test(user.email));
    /*if (!user.email) {
      const errorMsg = "L'adresse email ne peut pas être vide";
      setEmailError(errorMsg);
    } else*/ if (!emailValid && user.email.length < EMAIL_MAX_LENGTH && user.email.length>0) {
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
    console.log(user);
  }, [user])
  

  useEffect(() => {
    async function fetchData() {
      const res = await isAvailableUsername(user.username);
      if (!res.available) {
        setUsernameError(
          "Désolé, ce nom d'utilisateur est déjà associé à un compte"
        );
      }
    }
    fetchData();
  }, [user.username]);

 

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
    /*if (!email) {
      const errorMsg = "L'adresse email ne peut pas être vide";
      setEmailError(errorMsg);
      return {
        validateStatus: "error",
        errorMsg: "L'adresse email ne peut pas être vide",
      };
    } else*/ if (!emailValid && email.length < EMAIL_MAX_LENGTH && email.length>0) {
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
  const [isEmailError, setIsEmailError] = useState(false);

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

  const isMatchPassword = () => {
    if (user.password !== user.password2) {
      setPasswordError("Mos de passe différent");
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

  const inscription = async (e) => {
    e.preventDefault()
    if (
      passwordError ||
      emailError ||
      nomError ||
      prenomError || user.password2==="" || user.username.length<=USERNAME_MIN_LENGTH
    ) {
      message.error("Formulaire invalide");
    } else {
        try{
            const res = await proSignup(user);
            console.log(res);
            message.success({
                content:"Inscription réussie",
                className:"relative top-16"
            });
            navigate("/login");
        }catch(error){
          message.error({
            content:"Echec d'inscription",
            className:"relative top-16"
        });
            console.log(error);
        }       
    }
  }
  
  useEffect(() => {
    setUser({...user, "competences":competence.souscategorie})
  }, [competence.souscategorie])
  
  const [checkedItems, setCheckedItems] = useState([])
  const handleCompetenceChange = (event) => {
    const value = event.target.value;
    setCompetence({...competence, [event.target.name]:value});
  }
  const handleSousCatChange = (event) => {
    const value = event.target.value;
    const x = sousCategorie.find(option => option.id == value);
    console.log(sousCategorie, value, x);
    if (event.target.checked) {
      setCheckedItems([...checkedItems, x]);
    } else {
        const newItems = checkedItems.filter(item => item.id != value);
      setCheckedItems(newItems);
    }
  };
  useEffect(() => {
    setCompetence({...competence, 'souscategorie':checkedItems});
    //console.log(checkedItems);
  }, [checkedItems])
  useEffect(() => {
    setUser({...user, "competences":competence.souscategorie});
    console.log(competence);
  },[competence])
  

  return (
    <div>
      <div>
        <h1 className="text-3xl font-poppins text-my-blue text-center">
          Devenir prestataire
        </h1>
        <Box className="px-6 border rounded-md bg-white shadow-md ">
        
          <form
            onSubmit={inscription}
            className=" rounded-md bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <Box className="flex flex-col col-span-1" sx={{borderBottom:"1px", paddingBottom:"15px"}} >
                <Typography sx={{fontSize:"20px", fontWeight:"bold", fontFamily:"Poppins"}}>Coordonnées</Typography>
                          
              <TextField
                required
                error={nomError?true:false}
                helperText={nomError?`Nom trop court (Minimum ${NAME_MIN_LENGTH} caractères nécessaires)`:''}
                variant="standard"
                label="Nom"
                name="nom"
                id="nom"
                value={user.nom}
                onChange={(e) => handleChange(e, validateName)}
             
              />
              <TextField
              required
              error={prenomError?true:false}
              helperText={''}
                variant="standard"
                label="Prénom"
                name="prenom"
                id="prenom"
                value={user.prenom}
                onChange={(e) => handleChange(e, validatePrenom)}
               
              />

            <TextField
              required
              error={usernameError?true:false}
              helperText={usernameError?usernameError:""}
              label="Username"
              variant="standard"
              name="username"
              id="username"
              value={user.username}
              onBlur={checkUsernameAvailability}
              onChange={(e) => handleChange(e, validateUsername)}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              variant="standard"
              required
              error={emailError?true:false}
              helperText={emailError?emailError:""}
              label="Email"
              name="email"
              id="email"
              value={user.email}
              onBlur={checkEmailAvailability}
              onChange={(e) => handleChange(e, validateEmail)}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              variant="standard"
              label="Téléphone"
              name="num_tel"
              id="num_tel"
              value={user.num_tel}
              onChange={handleInputChange}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              variant="standard"
              label="CIN"
              name="CIN"
              id="CIN"
              value={user.CIN}
              onChange={handleInputChange}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              variant="standard"
              label="Mot de passe"
              type="password"
              name="password2"
              id="password2"
              value={user.password2}
              onChange={(e) => handleChange(e, validatePassword)}
              onBlur={isMatchPassword}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              variant="standard"
              label="Confirmer mot de passe"
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(e) => handleChange(e, validatePassword)}
              onBlur={isMatchPassword}
            />
            {passwordError && (
              <p className="text-sm font-roboto text-red-600 w-full px-2">
                {passwordError}
              </p>
            )}
          </Box>
          <Box className="md:col-span-2 lg:col-span-3">
          <Typography sx={{fontSize:"20px", fontWeight:"bold", fontFamily:"Poppins"}}>Compétences</Typography>
          <Box className=" grid grid-cols-3 lg:grid-cols-4">
          
          {categorie?.map((cat) => (
            <Box>
              <Souscat category={cat} handleSousCatChange={ handleSousCatChange} />
            </Box>
          ))}
</Box></Box>
          </form>

          <div className="flex flex-col items-end">
            <Box>
            <button
            onClick={inscription}
              className="text-white rounded-md font-bold mt-6 py-2 text-lg border-none hover:bg-orange-600 bg-orange-500 transition-colors ease-in-out cursor-pointer "
            >
             
              Créer un compte
            </button> </Box>
            <p className="font-caption">Vous avez déjà un compte? <Link to="/login" className="text-blue-500 no-underline hover:underline hover:text-blue-600 font-caption">Se connecter</Link></p>
          
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ProRegister;
