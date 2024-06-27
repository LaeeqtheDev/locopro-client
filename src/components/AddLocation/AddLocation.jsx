import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      country: propertyDetails?.country || "Pakistan",
      city: propertyDetails?.city || "Lahore",
      address: propertyDetails?.address || "Punjab, Lahore",
    }
  });

  const [location, setLocation] = useState({
    country: propertyDetails?.country || "Pakistan",
    city: propertyDetails?.city || "Lahore",
    address: propertyDetails?.address || "Punjab, Lahore",
  });

  const watchedFields = watch(["country", "city"]);

  useEffect(() => {
    setLocation({
      ...location,
      country: watchedFields.country,
      city: watchedFields.city,
    });
  }, [watchedFields.country, watchedFields.city]);

  const onSubmit = (data) => {
    setPropertyDetails({
      ...propertyDetails,
      country: data.country,
      city: data.city,
      address: data.address,
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", flexDirection: "row" }}>
        {/* Left side - inputs */}
        <div style={{ flex: 1, gap: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              {...register("country", { required: true })}
              error={!!errors.country}
            >
              {getAll().map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
            {errors.country && <span style={{ color: "red" }}>Country is required</span>}
          </FormControl>

          <TextField
            fullWidth
            label="City"
            {...register("city", { required: true })}
            error={!!errors.city}
            helperText={errors.city ? "City is required" : ""}
          />

          <TextField
            fullWidth
            label="Address"
            {...register("address", { required: true })}
            error={!!errors.address}
            helperText={errors.address ? "Address is required" : ""}
          />
        </div>

        {/* Right side - Map */}
        <div style={{ flex: 1 }}>
          <Map country={location.country} city={location.city} address={propertyDetails?.address} />
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Button variant="contained" type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default AddLocation;
