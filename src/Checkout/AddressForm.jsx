import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import FormInput from "./FormInput";

function AddressForm({ checkoutToken, next }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setshippingCountry] = useState([]);
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  // console.log(checkoutToken);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setshippingCountry(Object.keys(countries)[0]);
    // console.log(countries);
  };

  const fetchShippingSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    console.log(options);
    setShippingOptions(options);
    setShippingOption(options[0]);
    // console.log(shippingOptions);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  console.log(shippingSubdivisions);
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  // console.log(subdivisions);
  // console.log(options);

  const methods = useForm();

  return (
    <>
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Billing address</h4>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) =>
              next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
            )}
          >
            <div className="row">
              <FormInput name="firstName" label="First Name" />
              <FormInput name="lastName" label="Last Name" />
              <FormInput name="address1" label="Address1" />
              <FormInput name="email" label="Email" />
              <FormInput name="City" label="City" />
              <FormInput name="ZIP" label="ZIP" />
                <div className="col-md-6 mb-3">
                  <label>Shipping Country</label>

                  <select
                    className="form-select w-100 p-2"
                    aria-label="Default select example"
                    value={shippingCountry}
                    onChange={(e) => setshippingCountry(e.target.value)}
                    multiple={false}
                  >
                    {countries.map((country) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              
              <div className="col-md-6 mb-3">
                <label>Shipping Subdivision</label>
                <select
                  className="form-select w-100 p-2"
                  aria-label="Default select example"
                  value={shippingSubdivision}
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                  multiple={false}
                >
                  {subdivisions.map((subdivision) => {
                    return (
                      <option
                        key={subdivision.id}
                        value={subdivision.id}
                      >
                        {subdivision.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Shipping Option</label>
                <select
                  className="form-select w-100 p-2"
                  aria-label="Default select example"
                  value={shippingOption}
                  onChange={(e) => setShippingOption(e.target.value)}
                  multiple={false}
                >
                  {options.map((option) => {
                    return (
                      <option
                        key={option.id}
                        value={option.id}
                      >
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to={"/cart"}>
                <button type="button" className="btn btn-outlined">Back To Cart</button>
                </Link>
                <button type="submit" className="btn btn-primary">Next</button>
              
              </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

export default AddressForm;

