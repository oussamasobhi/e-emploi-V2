import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MyCarousel = ({ images, loading, setLoading }) => {
    const [imagePath, setImagePath] = useState(null);
  const nbImages = images.length;
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    console.log(nbImages);
  }, [nbImages])
  const next  = () => {
    setCurrent(current+1);
  }
  const prev = () => {
    setCurrent(current-1);
  }
  useEffect(()=> {
    const loadImage =  () => {
        try{
            setImagePath(require("../public/files/" + images[current].name))
          }catch(error){
            console.log(error);
            setLoading(true);
          }finally{
            if(images.length>0){setLoading(false)}
          }
    }
    if(images.length>0) loadImage();
  }, [current])
  
  

  return (
    <div className="h-96 w-full overflow-hidden relative">
      {images && images.length>0 && (
        <>
          <div className="absolute z-20 flex h-full w-full justify-between items-center">
            {current>0 ?<Button onClick={prev} className={"h-full hover:scale-150" }>
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </Button> : <div></div>}
            {current<nbImages-1 ?  <Button onClick={next} className="h-full hover:scale-150">
              <ArrowForwardIosIcon sx={{ color: "white" }} />
            </Button> : <div></div>}
          </div>
          <div className="flex justify-center items-center">
            <img
              src={imagePath}
              className="h-full w-full object-cover"
            />
          </div>
        </>
      )}
      {(!images || images.length===0) && (
        <div className="flex justify-center items-center h-full w-full text-2xl text-gray-100 bg-slate-500">
          Sans photo
        </div>
      )}
    </div>
  );
};

export default MyCarousel;
