import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FIND_PERSONS } from "../query";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
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
    <>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setSearchname(p.name)}>show address</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
