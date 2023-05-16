import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

const Duree = ({annonce, setAnnonce}) => {
  const [hour, setHour] = useState(1);
  const [min, setMin] = useState("00");
  const [duree, setDuree] = useState("");
  const handlePlus = () => {
    if (hour >= 0) {
      if (min === "00") {
        setMin("30");
      } else {
        setMin("00");
        setHour(hour + 1);
      }
    }
  };
  const handleMoins = () => {
      if(duree!=="00h00") {if (min === "30") {
        setMin("00");
      } else {
        setMin("30");
        setHour(hour - 1);
      }}
    
  };
  useEffect(() => {
    const x = document.getElementById("duree");
    setDuree(x.innerText);
  }, [min, hour]);
  useEffect(() => {
    console.log(duree);
    setAnnonce({...annonce,"duree":duree});
  }, [duree]);

  return (
    <>
      
      <Box className="flex justify-center items-center">
        <Box className="flex">
          <Box
            onClick={handleMoins}
            sx={{ width: "56px", height: "56px" }}
            className="cursor-pointer flex justify-center items-center text-white rounded-full bg-orange-500 text-4xl hover:bg-orange-600 transition-colors ease-in-out"
          >
            -
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              marginX: "15px",
              width: "146px",
            }}
            id="duree"
          >
            {hour < 10 && <span>0</span>}
            <span>{hour}</span>h<span>{min}</span>
          </Typography>
          <Box
            onClick={handlePlus}
            sx={{ width: "56px", height: "56px" }}
            className="cursor-pointer flex justify-center items-center text-white rounded-full bg-orange-500 hover:bg-orange-600 transition-colors ease-in-out text-4xl "
          >
            +
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Duree;
