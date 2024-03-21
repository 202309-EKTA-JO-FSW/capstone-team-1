"use client";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

const AddressField = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const allCountries = Country.getAllCountries();

  const countries = allCountries.map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null); // Reset city when changing country
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const getCitiesForSelectedCountry = () => {
    if (selectedCountry) {
      const countryData = Country.getCountryByCode(selectedCountry.value);
      const countryCities = City.getCitiesOfCountry(countryData.isoCode);
      return countryCities.map((city) => ({
        label: city.name,
        value: city.name,
      }));
    }
    return [];
  };

  return isMounted ? (
    <div className="flex">
      <Select
        id="country-select" // Unique id for the country select
        value={selectedCountry}
        onChange={handleCountryChange}
        options={countries}
        placeholder="Select a country"
      />
      <Select
        id="city-select" // Unique id for the city select
        value={selectedCity}
        onChange={handleCityChange}
        options={getCitiesForSelectedCountry()}
        placeholder="Select a city"
        isDisabled={!selectedCountry}
      />
    </div>
  ) : null;
};

export default AddressField;
