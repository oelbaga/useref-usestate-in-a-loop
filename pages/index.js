import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const searchButtonRefs = useRef([]);
  const fields = [
    {
      field: true,
    },
    {
      field: true,
    },
  ];

  // use fields as default state
  let fieldsStateContent = [];
  const fieldsStateContentMap = fields.map((field) => {
    fieldsStateContent.push({
      disabled: false,
      value: "",
    });
  });

  const [fieldsState, setFieldsState] = useState(fieldsStateContent);

  function handleSearchButton(i) {
    //A. Update dom
    // searchButtonRefs.current[i].setAttribute("disabled", "");
    //B. Update array in state
    const updateFieldInState = fieldsState.map((fieldstate, index) => {
      if (i === index) {
        const newfieldstate = {
          ...fieldstate,
          disabled: !fieldstate.disabled,
        };
        return newfieldstate;
      } else {
        return fieldstate;
      }
    });
    setFieldsState(updateFieldInState);
  }

  function handleInputTyping(i, value) {
    const updateFieldInState = fieldsState.map((fieldstate, index) => {
      if (i === index) {
        const newfieldstate = {
          ...fieldstate,
          value: value,
        };
        return newfieldstate;
      } else {
        return fieldstate;
      }
    });
    setFieldsState(updateFieldInState);
  }
  useEffect(() => {
    console.log(fieldsState);
  }, [fieldsState]);
  return (
    <>
      <main className={styles.main}>
        <form>
          {fields.map((field, i) => (
            <div key={i} className={styles.field}>
              <span className={styles.label}>field</span>
              <input
                type="text"
                onChange={(e) => handleInputTyping(i, e.target.value)}
              />
              <button
                type="button"
                ref={(el) => (searchButtonRefs.current[i] = el)}
                onClick={() => handleSearchButton(i)}
                className={`${
                  fieldsState[i].disabled ? styles.disabled : null
                }`}
              >
                Save
              </button>{" "}
              <div className={styles.label2}>
                Disabled: {fieldsState[i].disabled.toString()} <br />
                Value: {fieldsState[i].value}
              </div>
            </div>
          ))}
        </form>
      </main>
    </>
  );
}
