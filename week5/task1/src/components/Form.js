import React from "react";
import { Form, Field } from "react-final-form";
import Styles from "./Styles";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const programmingOptions = [
  { label: "Java", value: "java" },
  { label: "Ruby", value: "ruby" },
  { label: "C++", value: "c++" },
  { label: "Node.js", value: "node js" },
];

const roleOptions = [
  { label: "Back end", value: "backend" },
  { label: "Front end", value: "front end" },
  { label: "Full stack", value: "full stack" },
];

const MyForm = () => {
  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Styles>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label>Employed</label>
              <Field name="employed" component="input" type="checkbox" />
            </div>
            <div>
              <label>Programming</label>
              <div>
                {programmingOptions.map((option) => (
                  <label key={option.value}>
                    <Field
                      name="programmingLanguages"
                      component="input"
                      type="checkbox"
                      value={option.value}
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label>Role</label>
              <div>
                {roleOptions.map((option) => (
                  <label key={option.value}>
                    <Field
                      name="role"
                      component="input"
                      type="radio"
                      value={option.value}
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  );
};

export default MyForm;
