import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FIND_PERSONS } from "../query";
import "../style/person.scss";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>{person.phone}</div>
      <div>
        {person.address.street} {person.address.city}
      </div>

      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [searchName, setSearchname] = useState(null);
  const result = useQuery(FIND_PERSONS, {
    variables: { searchName },
    skip: !searchName,
  });

  if (searchName && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setSearchname(null)}
      />
    );
  }
  return (
    <div className='wrapper'>
      <h2 className='page_title'>Persons</h2>
      {persons.map((p) => (
        <article key={p.name} className='contact'>
          <h3>{p.name}</h3>
          <div>{p.phone}</div>
          <button
            onClick={() => setSearchname(p.name)}
            className='address_button'
          >
            show address
          </button>
        </article>
      ))}
    </div>
  );
};

export default Persons;
