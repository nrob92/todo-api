import React, { useState, useContext } from "react";
import { ContextApp } from "./App";

const Form = (props) => {


  
  const [value, setValue] = useState("");




  const { contextToggle, listItem, deleteButton, count } =
    useContext(ContextApp);




  const addValue = (e) => {
    e.preventDefault()
    if (value === "") return;
    contextToggle(value);
    setValue("");
    
  };

  






  return (
    <div>
      <h1>Nicks To Do List</h1>
      <div className="container">
        <form>
          <input
            className="input"
            placeholder="Type Here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className='click-btn' onClick={addValue}>Click Me</button>
        </form>
        <div>
          {listItem.map((item, index) => (
            <li>{item}</li> && 
            <li key={index}>
                {item.label}
                <button
                  onClick={(e) => deleteButton(index)}
                  className="deleteButton"
                >
                  X
                </button>
              </li>
          ))}
        </div>
        {count > 0 && <li>{count}</li>}
      </div>
    </div>
  );
};

export default Form;
