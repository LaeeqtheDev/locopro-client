import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "@mantine/form";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  // ==================== upload logic
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => createResidency({
      ...propertyDetails,
      facilities: { bedrooms, parkings, bathrooms },
    }, token),
    onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
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
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maxWidth="30%" mx="auto" my={2}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          label="No of Bedrooms"
          type="number"
          fullWidth
          required
          error={!!form.errors.bedrooms}
          helperText={form.errors.bedrooms}
          {...form.getInputProps("bedrooms")}
          margin="normal"
        />
        <TextField
          label="No of Parkings"
          type="number"
          fullWidth
          error={!!form.errors.parkings}
          helperText={form.errors.parkings}
          {...form.getInputProps("parkings")}
          margin="normal"
        />
        <TextField
          label="No of Bathrooms"
          type="number"
          fullWidth
          required
          error={!!form.errors.bathrooms}
          helperText={form.errors.bathrooms}
          {...form.getInputProps("bathrooms")}
          margin="normal"
        />
        <Grid container spacing={2} justifyContent="center" marginTop={2}>
          <Grid item>
            <Button variant="outlined" onClick={prevStep}>
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" color="primary" disabled={isLoading}>
              {isLoading ? "Submitting" : "Add Property"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Facilities;
