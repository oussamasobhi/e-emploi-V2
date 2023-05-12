import { message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  createAnnonce,
  getSousCategories,
} from "../util/APIUtils";
import { useNavigate } from "react-router";
import {
  Box,Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const CreateAnnonce = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  
  const [annonce, setAnnonce] = useState({
    titre_annonce: "",
    description: "",
    tarif_depart: "",
    tarif_final: "",
    date_fin_annonce: "",
    id_categorieAnnonce: "",
    id_categorie2Annonce: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const _souscat1 = await getSousCategories(1);
      const _souscat2 = await getSousCategories(2);
      const _souscat3 = await getSousCategories(3);
      setCategories(_souscat1.concat(_souscat2).concat(_souscat3));
    };
    loadCategories();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories])
  useEffect(() => {
   console.log(annonce)
  }, [annonce])
  

  const handleChange = (event) => {
    const value = event.target.value;
    setAnnonce({ ...annonce, [event.target.name]: value });
  };
  const creerAnnonce = async () => {
    try {
      await createAnnonce(annonce);
      navigate("/annonce");
      //notify("Notification", "Annonce créée ", "info");
      message.success("Annonce créée avec succès");
    } catch (error) {
      message.error("Erreur");
      console.log(error);
    }
  };

  return (
    <div className="w-auto">
      <div className="mx-auto px-auto bg-gray-100 flex flex-col items-center justify-center">
        <Typography className="text-3xl text-center font-caption py-2 font-bold">
          Créer une annonce
        </Typography>
        <Box
          className="flex-none w-88 bg-white py-6 rounded-lg shadow-lg px-4"
          component="form"
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              label="Titre"
              variant="standard"
              fullWidth
              name="titre_annonce"
              value={annonce.titre_annonce}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              required
              label="Description"
              variant="standard"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={annonce.description}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
          </div>
          <div className="grid grid-cols-2">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                variant="standard"
                label="Tarif"
                name="tarif_depart"
                type="number"
                value={annonce.tarif_depart}
                onChange={handleChange}
                sx={{ marginBottom: "10px" }}
              />
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={annonce.id_categorie2Annonce}
                defaultValue=""
                onChange={handleChange}
                label="Catégorie"
                name="id_categorie2Annonce"
              >
                {categories?.map((categorie, index) => (
                  <MenuItem key={index} value={categorie.id}>
                    {categorie.nom_sous_categorie}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button  variant="contained" onClick={creerAnnonce}>
              Ajouter
            </Button>
        </Box>
        
      </div>
    </div>
  );
};

export default CreateAnnonce;
