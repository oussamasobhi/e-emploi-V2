import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Box } from "@mui/material";

const Date = ({annonce, setAnnonce}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    console.log(selectedDate);
    setAnnonce({...annonce,"date":selectedDate});
  }, [selectedDate])

  return (<>
    <Box >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Choisir la date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField variant="standard" {...params} />}
      />
    </LocalizationProvider>

    </Box>
    </>
  );
};

export default Date;
