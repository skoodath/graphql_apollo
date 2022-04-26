import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "../query";
import "../style/personform.scss";

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
    <div className='wrapper'>
      <h2 className='page_title'>Create New Contact</h2>
      <form onSubmit={submit}>
        <div className='form_elements'>
          <div className='input_group'>
            <label htmlFor='name'>Name</label>
            <input
              value={name}
              name='name'
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div className='input_group'>
            <label htmlFor='phone'>Phone</label>
            <input
              value={phone}
              name='phone'
              onChange={({ target }) => setPhone(target.value)}
            />
          </div>
          <div className='input_group'>
            <label htmlFor='street'>Street</label>
            <input
              value={street}
              name='street'
              onChange={({ target }) => setStreet(target.value)}
            />
          </div>
          <div className='input_group'>
            <label htmlFor='city'>City</label>
            <input
              value={city}
              name='city'
              onChange={({ target }) => setCity(target.value)}
            />
          </div>
          <button type='submit' className='add_contact'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
