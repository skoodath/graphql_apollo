import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import "../style/personform.scss";

import { EDIT_NUMBER } from "../query";

const AddPhone = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const submit = (event) => {
    event.preventDefault();
    changeNumber({ variables: { name, phone } });
    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("person not found");
    }
  }, [result.data]); // eslint-disable-line
  return (
    <div className='wrapper'>
      <h2 className='page_title'>Add/Change Phone</h2>

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
        </div>
        <div>
          <div className='input_group'>
            <label htmlFor='phone'>Phone</label>
            <input
              value={phone}
              name='phone'
              onChange={({ target }) => setPhone(target.value)}
            />
          </div>
        </div>
        <button type='submit' className='add_contact'>
          Add / Change Phone
        </button>
      </form>
    </div>
  );
};

export default AddPhone;
