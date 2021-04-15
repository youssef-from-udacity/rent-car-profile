import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import getMonth from "date-fns/getMonth";
import CustomInput from './CustomDatePickerInput/CustomDatePickerInput';
import Box from '@material-ui/core/Box';
import TimeElapsed from './ElapsedTime/ElapsedTime';


registerLocale("fr", fr);

const CustomDatePickerHeader = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
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
            variant="h5"
            id="outlined-basic"
            label="Outlined"
            style={{ flexGrow: "1",fontWeight: 700 }}
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
const SelectTime = (props) => {
  //const [startDate, setStartDate] = useState(new Date());
  const { startDate, onChange } = props

  return (
    <DatePicker
      selected={startDate}
      onChange={date => onChange(date)}
      showTimeSelect
      showTimeSelectOnly
      withPortal
      onCalendarOpen={() => document.body.style.setProperty("overflow", 'hidden')}
      onCalendarClose={() => document.body.style.setProperty("overflow", 'auto')}
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      customInput={<CustomInput style={{ marginLeft: 8, }} />}
    />
  );
};

export default function DatePickerRange(props) {
  let { startDate, endDate, handleChange } = props
  startDate = endDate < new Date() ?  new Date() : startDate;

  const onChange = (date) => {
    const dates = Array.isArray(date) ? date : [date, endDate]
    handleChange(dates)
  }
  return (
    <>
      <Box my={1} style={{ display: "flex", }}>
        <CustomDatePickerHeader
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          withPortal
          selectsRange
          onCalendarOpen={() => document.body.style.setProperty("overflow", 'hidden')}
          onCalendarClose={() => document.body.style.setProperty("overflow", 'auto')}
          minDate={new Date()}
          showDisabledMonthNavigation
          shouldCloseOnSelect={false}
          dateFormat="MM/dd/yyyy"
          locale='fr'
          customInput={<CustomInput startIcon={true} />}
        />
        <SelectTime startDate={startDate} onChange={onChange} />
      </Box>

      <TimeElapsed endDate={endDate} />
    </>
  );
};

