import { useState } from "react";
import WelcomeMessage from "./WelcomeMessage";
const Form = () => {
  // const [student, setStudent] = useState({
  //   name: "",
  //   lastname: "",
  // });
  const [values, setValues] = useState({ name: "" });

  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event) => {
    const name = event.target.value;
    setValues((values) => ({ ...values, name }));
  };

  const handleClick = () => {
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setSubmitted((submitted) => !submitted);
  };

  if (!submitted) {
    return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>First Name</label>
          <input
            type="text"
            id="add-user-name"
            placeholder="First Name"
            required
            value={values.name}
            onChange={handleNameChange}
          />
        </fieldset>
        {/* <button type="submit">{!student.id ? "ADD": "SAVE"}</button> */}
        <button type="submit">Add</button>
      </form>
    );
  } else {
    return (
      <>
        <WelcomeMessage formInfo={values} />
        {/* <button onClick={handleClick}>Go back</button> */}
      </>
    );
  }
};

export default Form;
