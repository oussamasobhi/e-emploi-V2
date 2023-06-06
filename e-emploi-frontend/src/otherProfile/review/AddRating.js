import { Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { addReviews } from "../../util/APIUtils";

const AddRating = ({ open, setIsOpen, iduser, refreshRate, initialRate }) => {
  const [review, setReview] = useState({
    avis: "",
    rate: "",
    iduser: iduser,
  });
  useEffect(() => {
    console.log(iduser);
  }, [iduser]);

  const reset = () => {
    setIsOpen(false);
  };
  const ajouterReview = async () => {
    console.log(review);
    try{
        const res = await addReviews(review);
        console.log(res);
    }catch(error){
        console.log(error);
    }
    reset();
    refreshRate(iduser);
  };
  const changeRating = (newRating, name) => {
    console.log(newRating);
    setReview({...review, rate : newRating});
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setReview({...review, [event.target.name] : value})
  };
  return (
    <Modal
      title="Donner une note"
      open={open}
      footer={[
        <Button type="primary" onClick={ajouterReview}>
          Enregistrer
        </Button>,
        <Button onClick={reset}>Fermer</Button>,
      ]}
    >
      <div className="flex flex-col">
        <StarRatings
          name="rate"
          starRatedColor="rgb(34 197 94)"
          starHoverColor="rgb(74 222 128)"
          rating={review.rate?review.rate:initialRate}
          changeRating={changeRating}
        />
      </div>
    </Modal>
  );
};

export default AddRating;
