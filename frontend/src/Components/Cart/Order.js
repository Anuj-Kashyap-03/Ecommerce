import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./Order.scss";
import AddressForm from "./Address";
import OrderSummery from "./OrderSummery";
import PaymentForm from "./Payment";

const steps = ["Address", "Order Summery", "Payment"];

export default function Order() {

  const [activeStep, setactiveStep] = React.useState(0);

  return (
    <div className="order">
      <Box sx={{ width: "100%" }} className="steps">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === 0 && (
        <div>
          <AddressForm activateStep={setactiveStep} />
        </div>
      )}
      {activeStep === 1 && (
        <div>
          <OrderSummery activateStep={setactiveStep} />
        </div>
      )}
      {activeStep === 2 && (
        <div>
          <PaymentForm activateStep={setactiveStep} />
        </div>
      )}
    </div>
  );
}
