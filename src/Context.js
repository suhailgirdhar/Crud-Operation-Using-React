import React from "react";
const Context = React.createContext();

function ContextProvider({ children }) {
  const [finalList, setFinalList] = React.useState([]);

  const [input, setInput] = React.useState({
    id: "",
    name: "",
    url: "",
    img: "",
    tag: "",
  });

  //-------------ADD-------------

  function Add() {
    // e stands for existing
    const eIds = [...finalList.map((data) => data.id)];
    const eNames = [...finalList.map((data) => data.name)];
    const eUrls = [...finalList.map((data) => data.url)];

    const { id, name, url } = input;

    /*
    Add function will carry out four checks:
    1. Input or Url cannot be blank.
    2. (Reject Scenario) - if name or Url already exists and newId does not exist, then reject(duplicates not allowed).
    3. (Edit Scenario) - if newId already exists, then update existing record.
    4. (Add Scenario) - if name, Url and newId do not exist and then add new item

    */

    (name === "" || url === "") && alert("Name and Url cannot be blank");
    name === "Game" && alert("Name cannot be set as 'Game'");

    if (name !== "" && url !== "" && id !== "") {
      if (
        !eIds.includes(id) &&
        (eNames.includes(name) || eUrls.includes(url))
      ) {
        alert("Duplicates not allowed");
      }

      //---EDIT EXISTING RECORD------
      if (eIds.includes(id)) {
        let tempList = [];
        for (let i = 0; i < finalList.length; i++) {
          if (finalList[i].id !== id) {
            tempList.push(finalList[i]);
          } else {
            const { id, name, url, img, tag } = input;
            tempList.push({ id, name, url, img, tag });
          }
        }
        setFinalList(tempList);
        setInput({
          id: "",
          name: "",
          url: "",
          img: "",
          tag: "",
        });
      }

      //----------ADD NEW RECORD----------

      if (
        !eIds.includes(id) &&
        !eNames.includes(name) &&
        !eUrls.includes(url)
      ) {
        finalList.push(input);
        setInput({
          id: "",
          name: "",
          url: "",
          img: "",
          tag: "",
        });
      }
    }
  }

  //-------CLEAR-----------

  function Clear() {
    setInput({
      id: "",
      name: "",
      url: "",
      img: "",
      tag: "",
    });
  }

  //---------EDIT--------------

  function Edit(event) {
    const i = event.target.value;

    setInput(() => {
      const { id, name, url, img, tag } = finalList[i];
      return { id, name, url, img, tag };
    });
  }

  //---------Delete--------------

  function Delete(event) {
    const index = Number(event.target.value);

    let tempList = [];

    for (let i = 0; i < finalList.length; i++) {
      if (i !== index) {
        tempList.push(finalList[i]);
      }
    }
    setFinalList(tempList);
  }

  //---------HANDLE CHANGE--------------
  function HandleChange(event) {
    const { name, value } = event.target;
    const eIds = [...finalList.map((data) => data.id)];

    let newId;

    eIds.length === 0 && (newId = 1);
    eIds.length > 0 && (newId = Math.max(...eIds) + 1);

    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
        id: eIds.includes(input.id) ? input.id : newId,
      };
    });
  }

  return (
    <Context.Provider
      value={{ finalList, input, HandleChange, Add, Clear, Edit, Delete }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
export { Context };
