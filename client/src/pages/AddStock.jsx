import "../styles/App.css";
import React, { useState, useRef } from "react";
import {  stockSchema } from "../utility/schemas";
import { getInitialState, isCorrect  } from "../utility/formHelpers";
import { DateTimePicker, LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import axios from "../api/axios";


import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  Select,
  MenuItem,
  TextField
} from "@material-ui/core/";
// import { API } from "../constants/extras";
const STOCKPOST_URL = "/addStockPost";

function AddStock() {
  const [stockUploadDetails, setStockUploadDetails] = useState(
    getInitialState(stockSchema)
  );
  const [zeroSubmission, setZeroSubmission] = useState(true);
  const [focus, setFocus] = useState(false);

  const typeRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const urlRef = useRef(null);
  const isactiveRef = useRef(null);

  const styles = {
    margin: "10px",
    width: "300px",
  };

  const resetAll = () => {
    setStockUploadDetails(getInitialState(stockSchema));
    setFocus(false);
    setZeroSubmission(true);
  };


  const focusElement = (formFields) => {
    for (const field in formFields) {
      if (formFields[field].error) {
        switch (field) {
          case "type":
            typeRef.current.focus();
            break;
          case "title":
            titleRef.current.focus();
            break;
          case "content":
            contentRef.current.focus();
            break;
          case "image":
            imageRef.current.focus();
            break;
          case "url":
            urlRef.current.focus();
            break;
          case "isactive":
            isactiveRef.current.focus();
            break;
          default:
            break;
        }
        return;
      }
    }
  };

  const getFormFields = () => {
    let formFields = {};
    for (const field in stockSchema) {
      const extendedField = {};
      extendedField.error = false;
      extendedField.formHelperText = "";
      formFields[field] = extendedField;

      if (!zeroSubmission) {
        if (stockSchema[field].required && stockUploadDetails[field] === "") {
          formFields[field].error = true;
          formFields[field].formHelperText = "The given field is required.";
        } else if (stockSchema[field].type === String) {
          if (stockSchema[field].minlength > stockUploadDetails[field].length) {
            formFields[field].error = true;
            formFields[
              field
            ].formHelperText = `The ${field} should be of atleast ${stockSchema[field].minlength} length`;
          }
          if (stockSchema[field].maxlength < stockUploadDetails[field].length) {
            formFields[field].error = true;
            formFields[
              field
            ].formHelperText = `The ${field} should not exceed ${stockSchema[field].maxlength} length`;
          }
        }
      }
    }

    if (focus) {
      focusElement(formFields);
      setFocus(false);
    }

    return formFields;
  };

  const setValue = (field, value) => {
    setStockUploadDetails((prevState) => {
      let newState = { ...prevState };
      newState[field] = value;
      return newState;
    });
  };

  const onChangeHandler = (object, type, date = null) => {
    let value = object.target.value;
    let obj = object.target.id;
    if (!obj) obj = object.target.name;
    if (type === Boolean) value = object.target.checked;
    setValue(obj, value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(stockUploadDetails)
    // if (isCorrect(stockSchema, stockUploadDetails)) {
    //   var requestOptions = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${props.token}`,
    //     },
    //     body: JSON.stringify(stockUploadDetails),
    //   };
    //   var data;
    //   const response = await fetch(`${API}/nerp/add`, requestOptions);
    //   if (!response) {
    //     props.addAlert(
    //       <AlertComponent
    //         type="error"
    //         text="The Nerp Data wasn't added. Please try later."
    //       />
    //     );
    //     return;
    //   }
    //   data = await response.json();

    //   if (data.error) {
    //     props.addAlert(<AlertComponent type="error" text={data.error} />);
    //     return;
    //   }
    //   props.addAlert(
    //     <AlertComponent
    //       type="success"
    //       text={
    //         "The NERP data has been added to the website."
    //       }
    //     />
    //   );
    //   resetAll();
    // } else {
    //   setZeroSubmission(false);
    //   setFocus(true);
    // }
    try {
      // const response = await axios.post(
      //   STOCKPOST_URL,
      //   JSON.stringify({ newStockData }),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );
      resetAll();
      console.log("Upadted");

      //clear state and controlled inputs
      //need value attrib on inputs for this
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTheForm = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignContent: "center",
          }}
        >

          <FormControl fullWidth={true} style={styles} required>
            <InputLabel htmlFor={"title"}>{"Title"}</InputLabel>
            <Input
              id={"title"}
              aria-describedby="my-helper-text"
              value={stockUploadDetails["title"]}
              onChange={(obj) => onChangeHandler(obj, String)}
              error={errorFields["title"].error}
              inputRef={titleRef}
            />
            <FormHelperText id="my-helper-text">
              {errorFields["title"].formHelperText}
            </FormHelperText>
          </FormControl>

      
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label={"Event Date"}
                value={stockUploadDetails["event_date"]}
                onChange={(date) => setValue("event_date", date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={styles}
                    error={errorFields["event_date"].error}
                  />
                )}
              />
            </LocalizationProvider> */}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };

  const errorFields = getFormFields();

  return (
    <React.Fragment>
      <div>
        <h2>
          News and Events, Awards and Recognitions, Recent Publications Form
        </h2>
      </div>
      <div style={{ margin: "10px" }}>
        {getTheForm()}
      </div>
    </React.Fragment>
  );
}

export default AddStock;
