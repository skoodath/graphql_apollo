import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "../query";

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <br />
          <br />
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
          <br />
          <br />
          street{" "}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
          <br />
          <br />
          city{" "}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
          <br />
          <br />
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
