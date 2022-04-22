import { useQuery } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import AddPhone from "./components/AddPhone";
import Header from "./components/Header";
import Notify from "./components/Notify";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ALL_PERSONS } from "./query";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);

  if (result.loading) return <div>loading...</div>;
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  return (
    <div className='App'>
      <Notify errorMessage={errorMessage} />
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            exact
            element={<Persons persons={result.data.allPersons} />}
          />
          <Route
            path='add_contact'
            element={<PersonForm setError={notify} />}
          />
          <Route path='add_phone' element={<AddPhone setError={notify} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
