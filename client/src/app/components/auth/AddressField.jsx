// AddressField.jsx

"use client";
import React, { useState } from "react";
import { Country, City } from "country-state-city";

const AddressField = ({ setForm }) => {
  // Receive callback props
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const allCountries = Country.getAllCountries();

  const countries = allCountries.map((country) => ({
    label: country.name,
    isoCode: country.isoCode, // storing isoCode for reference
  }));

  const handleCountryChange = (event) => {
    const selectedCountryIsoCode = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.isoCode === selectedCountryIsoCode
    );
    setSelectedCountry(selectedCountry);
    setSelectedCity(null); // Reset city when changing country
    // Call the callback function to handle country change
    // onCountryChange(selectedCountry);

    // change the form
    setForm((prevState) => ({
      ...prevState,
      country: selectedCountry.label, // Set country value
      city: "", // Reset city when changing country
    }));
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
    // Call the callback function to handle city change
    // onCityChange(selectedCityName);

    // change form
    setForm((prevState) => ({
      ...prevState,
      city: selectedCityName, // Set city value
    }));
  };

  const getCitiesForSelectedCountry = () => {
    if (selectedCountry) {
      const countryData = Country.getCountryByCode(selectedCountry.isoCode);
      const countryCities = City.getCitiesOfCountry(countryData.isoCode);
      return countryCities.map((city) => city.name);
    }
    return [];
  };

  return (
    <div className="flex justify-between w-full">
      <select
        className="w-full mr-4 field-2"
        value={selectedCountry ? selectedCountry.isoCode : ""}
        onChange={handleCountryChange}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.label}
          </option>
        ))}
      </select>
      <select
        className="w-full ml-4 field-2"
        value={selectedCity || ""}
        onChange={handleCityChange}
        disabled={!selectedCountry}
      >
        <option value="">Select a city</option>
        {getCitiesForSelectedCountry().map((cityName, i) => (
          <option key={i} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressField;
