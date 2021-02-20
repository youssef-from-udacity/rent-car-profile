import React from "react";
import "../DatePicker.css";
import Button from '@material-ui/core/Button';
import TouchAppIcon from '@material-ui/icons/TouchApp';



const CustomInput = React.forwardRef(({ value, onClick,startIcon, ...props }, ref) => {

  return (
    <Button ref={ref} {...props} className="example-custom-input" 
    startIcon={startIcon&&<TouchAppIcon />}
    onClick={onClick} variant="outlined" color="primary">{value}</Button>
  )
});

export default CustomInput;