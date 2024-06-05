import React, { useState } from "react";
import { Modal, Container, Stepper, Step, StepLabel } from "@mui/material";
import AddLocation from "../AddLocation/AddLocation";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";
import { useAuth0 } from "@auth0/auth0-react";
// Import CSS file
import "./AddPropertyModal.css"; // Assuming your CSS file is named styles.css

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const {user} = useAuth0()
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  });

  const steps = ["Location", "Images", "Basics", "Facilities"];

  const nextStep = () => {
    setActive((current) => (current < steps.length - 1 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const handleStepClick = (index) => {
    setActive(index);
  };

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      aria-labelledby="add-property-modal-title"
    >
      <Container maxWidth="md" maxHeight="lg" className="modal-content">
        <Stepper activeStep={active} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel onClick={() => handleStepClick(index)}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {active === steps.length ? (
            <div>
              <p>Completed, click back button to get to previous step</p>
            </div>
          ) : (
            <div>
              {active === 0 && <AddLocation propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} nextStep={nextStep}/>}
              {active === 1 && <UploadImage propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} nextStep={nextStep} prevStep={prevStep}/>}
              {active === 2 && <BasicDetails propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} nextStep={nextStep} prevStep={prevStep}/> }
              {active === 3 && <Facilities propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} nextStep={nextStep} prevStep={prevStep} />}
            </div>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
