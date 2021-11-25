import React, { createContext, useState, useEffect } from "react";
import Form from "./Form";

export const ContextApp = createContext();

export default function App() {
  //use state variables//
  const [listItem, setListItem] = useState([]);
  const [count, setCount] = useState(0);

  // get api//
  const get = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nickrobinson")
      .then((response) => response.json())
      .then((listItem) => setListItem(listItem))
      .catch((error) => console.log("error", error));
  };

  useEffect(get, []);

  // put api//
  const put = (newList) => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(newList);

    setListItem(newList);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/nickrobinson",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  //post api//

  /*const postApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify([]);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/nickrobinson",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };*/

  function contextToggle(value) {
    const newValue = {
      label: value,
      done: false,
    };

    const newList = [...listItem, newValue];

    put(newList);

    if (value !== "") {
      setCount(count + 1);
    }
  }

  function deleteButton(index) {
    const deleted = listItem.filter((element, id) => id !== index);
    put(deleted);
    setCount((prevCount) => prevCount - 1);
  }

  const context = { contextToggle, listItem, deleteButton, count };

  return (
    <ContextApp.Provider value={context}>
      <Form />
    </ContextApp.Provider>
  );
}
