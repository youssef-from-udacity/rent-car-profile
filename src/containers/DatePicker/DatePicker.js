import React, { useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import getMonth from "date-fns/getMonth";
import CustomInput from '../../components/CustomDatePickerInput/CustomDatePickerInput';
import Box from '@material-ui/core/Box';
import TimeElapsed from '../../components/ElapsedTime/ElapsedTime';



registerLocale("fr", fr);

const CustomDatePickerHeader = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return (

    <DatePicker
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}

        >
          <IconButton
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            aria-label="Previous Month"
            style={{ margin: "5px" }}
          >
            <ArrowForwardIosIcon
              fontSize="small"
              className="arrowBackwardIosIcon"
            />
          </IconButton>
          <Typography
            variant="h6"
            id="outlined-basic"
            label="Outlined"
            style={{ flexGrow: "1" }}
          >{months[getMonth(date)]}</Typography>
          <IconButton
            aria-label="Next Month"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            style={{ margin: "5px" }}
          >
            <ArrowForwardIosIcon className="arrowForwardIosIcon" />
          </IconButton>
        </div>
      )}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      {...props}
    />
  );
};


export default function DatePickerRange() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(0);
  const endDateRef = useRef('')

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    endDateRef.current = end ? 'end': '';
    window.youssef = endDateRef;
    
  };

  return (
    <>
    <Box my={1}>
      <CustomDatePickerHeader
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        shouldCloseOnSelect={false}
        withPortal
        dateFormat="MM/dd/yyyy"
        locale='fr'
        customInput={<CustomInput />}
      />
      </Box>
      
      <TimeElapsed startDate={startDate} endDate={endDate} />
      </>
  );
};
