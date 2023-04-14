import React, { useRef, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));



function getSteps() {
  return [
    "Basic information",
    "Personal Information",
    "Address Information",
    "Upload Documents",
  ];
}
const BasicForm = () => {
  const { control } = useFormContext();
  const firstName = useRef('');;
  return (
    <>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            ref='myTextField'
            id="email-address"
            label="E-mail Address"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            inputRef={firstName}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="userName"
        render={({ field }) => (
          <TextField
            id="user-name"
            label="Username"
            variant="outlined"
            placeholder="Enter username"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            type="password"
            id="pass-word"
            label="Password"
            variant="outlined"
            placeholder="Enter Password"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="userAge"
        render={({ field }) => (
          <TextField
            type="Number"
            id="age"
            label="Age"
            variant="outlined"
            placeholder="Enter Your Age"
            style={{ width: "30%" }}
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="userGender"
        render={({ field }) => (
          <TextField
            type="select"
            id="gender"
            label="Gender"
            variant="outlined"
            placeholder="Gender"
            style={{ width: "40%" }, { marginLeft: "30px" }}
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="userDOB"
        render={({ field }) => (
          <TextField
            type="Date"
            id="dob"
            label="DOB"
            variant="outlined"
            placeholder="Date of Birth"
            style={{ width: "40%" }, { marginLeft: "30px" }}
            margin="normal"
            {...field}
          />
        )}
      />




    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="address1"
        render={({ field }) => (
          <TextField
            id="address1"
            label="Address Line 1"
            variant="outlined"
            placeholder="Enter Your Address 1"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="address2"
        render={({ field }) => (
          <TextField
            id="address2"
            label="Address Line 2"
            variant="outlined"
            placeholder="Enter Your Address 2"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="userState"
        render={({ field }) => (
          <TextField
            id="state"
            label="State"
            variant="outlined"
            placeholder="State Ex Maharashtra"
            style={{ width: "30%" }}
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="userDistrict"
        render={({ field }) => (
          <TextField
            id="district"
            label="District"
            variant="outlined"
            placeholder="Enter Your District Name"
            style={{ width: "30%" }, { marginLeft: "20px" }}
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="userPinCode"
        render={({ field }) => (
          <TextField
            type="Number"
            id="pin-code"
            label="PIN Code"
            variant="outlined"
            placeholder="Enter Your PIN Code"
            style={{ width: "30%" }, { marginLeft: "20px" }}
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="aadharNumber"
        render={({ field }) => (
          <div>
            <TextField
              id="aadharNumber"
              label="Aadhar Card Number"
              variant="outlined"
              placeholder="Enter Your Aadhar Card Number"
              style={{ width: "50%" }}
              margin="normal"
              {...field}
            />
            <div style={{ width: "100px" }, { marginBottom: "20px" }}><input type="file" id="myfile" name="myfile" /> </div>


          </div>
        )}
      />


      <Controller
        control={control}
        name="voterCard"
        render={({ field }) => (
          <div>
            <TextField
              id="voterCard"
              name="epicNumber"
              label="EPIC Number"
              variant="outlined"
              placeholder="Enter Your EPIC Number"
              style={{ width: "50%" }}
              margin="normal"
              {...field}
            />
            <div style={{ width: "100px" }, { marginBottom: "20px" }}><input type="file" id="myfile" name="myfile" /> </div>
          </div>
        )}
      />

    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
      userAge: 0,
      userGender: "",
      phoneNumber: "",
      alternatePhone: "",
      address1: "",
      address2: "",
      country: "",
      userState: "",
      userDistrict: "",
      aadharNumber: "",
      epicNumber: "",

    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  

  const handleClick =  (data) => {
    axios.post("http://localhost:3000/users/register", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: data
    }).then(function (response) {
      console.log(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  };


  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      
      handleClick(data);
     
      setActiveStep(activeStep + 1);

    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // const handleSkip = () => {
  //   // if (!isStepSkipped(activeStep)) {
  //   //   setSkippedSteps([...skippedSteps, activeStep]);
  //   // }
  //   setActiveStep(activeStep + 1);
  // };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div >
      <div style={{ marginTop: "10px" }}>
        <Typography variant="h3" align="center">
          Registration
        </Typography>
      </div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          {/* if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                
              </Typography>
            );
          } */}
          {/* if (isStepSkipped(index)) {
            stepProps.completed = false;
          } */}
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <div style={{ padding: "10px" }}>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}
                <div></div>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button>
                {/* {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )} */}
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
                  type="submit"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </form>
            </div>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;