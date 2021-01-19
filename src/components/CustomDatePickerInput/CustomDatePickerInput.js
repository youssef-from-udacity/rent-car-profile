import React from "react";
import "../../containers/DatePicker/DatePicker.css";
import Button from '@material-ui/core/Button';



const CustomInput = React.forwardRef(({ value, onClick, ...props }, ref) => {

  return (
    <Button ref={ref} {...props} className="example-custom-input" onClick={onClick} variant="outlined" color="primary">{value}</Button>
  )
});

export default CustomInput;