import { Checkbox, FormControl, FormControlLabel, FormLabel, Typography } from "@mui/material";
import { getSousCategories } from "../util/APIUtils";
import { useEffect, useState } from "react";
const Souscat = ({category,  handleSousCatChange}) => {
    const [sousCategorie, setSousCategorie] = useState(null);

    useEffect(() => {
        const loadSousCategorie = async () => {
            try{
                const res = await getSousCategories(category.id);
                setSousCategorie(res);
            }catch(error){
                console.log(error)
            }
        };
        loadSousCategorie();
      }, [category])
    return (
        <>
            <Typography variant="h6" sx={{fontFamily:"Poppins"}}>{category.nom_categorie}</Typography>
           
            <FormControl>
                {sousCategorie?.map((item, index)=>(
              <FormControlLabel
              control={<Checkbox key={index} value={item.id} onChange={handleSousCatChange} />}
              label={item.nom_sous_categorie}
              />
              )) }
            </FormControl>
            
        </>
    )
}

export default Souscat;