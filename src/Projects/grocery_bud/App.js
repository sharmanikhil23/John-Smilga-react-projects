import React, { useState, useEffect } from "react";
import { IoTrashOutline, IoPencil } from "react-icons/io5";

import "./css/index.css";
//this method will run only one time will help to fetch the data from hte local storage if we have any data
const gettingData = () => {
  let oldList = localStorage.getItem("listOfGrocery");
  if (!oldList) {
    return [];
  } else {
    return (oldList = JSON.parse(localStorage.getItem("listOfGrocery")));
  }
};

export const App = () => {
  const [alert, setAlert] = useState({ alert: false, message: "", type: "" });
  //it will take care of our entire grocery list
  const [list, setList] = useState(gettingData());

  //It will save the data to the local storage as soon as there will be change in the list
  useEffect(() => {
    localStorage.setItem("listOfGrocery", JSON.stringify(list));
  }, [list]);

  //it will take care of our current input in the form
  const [input, setInput] = useState("");

  //This state value take care do we want to edit or not
  const [edit, setEdit] = useState(false);
  //this state will take care of the initial value before edit
  const [valueBeforeEdit, setValueBeforeEdit] = useState("");
  //adding data in the list and re-rendering it too
  const savingData = (e) => {
    e.preventDefault();

    if (edit) {
      let result = list.map((data) => {
        if (data === valueBeforeEdit) {
          return input;
        } else {
          return data;
        }
      });
      setList(result);
      setEdit(false);
      setInput("");
      setAlert((data) => {
        return {
          ...data,
          alert: true,
          message: `${valueBeforeEdit} is updated to ${input}`,
          type: "saved",
        };
      });
      return;
    }

    setList((currentData) => [...currentData, input]);
    setAlert((data) => {
      return {
        ...data,
        alert: true,
        message: `${input} is added`,
        type: "saved",
      };
    });
    setInput("");
  };

  const editingData = (valueToEdit) => {
    setEdit(true);
    setInput(valueToEdit);
    setValueBeforeEdit(valueToEdit);
  };

  const deletingData = (dataToDelete) => {
    setList((data) => {
      let result = data.filter((value) => {
        if (value.toUpperCase() !== dataToDelete.toUpperCase()) {
          return value;
        }
        return "";
      });
      return result;
    });
    setAlert((data) => {
      return {
        ...data,
        alert: true,
        message: `${dataToDelete} is deleted from list`,
        type: "delete",
      };
    });
  };

  return (
    <div id="playArea">
      {alert.alert === true ? (
        <Alert alert={alert} list={list} setAlert={setAlert}></Alert>
      ) : (
        <></>
      )}

      <Heading></Heading>
      <Input
        input={input}
        setInput={setInput}
        savingData={savingData}
        edit={edit}
      ></Input>
      <Output
        list={list}
        deletingData={deletingData}
        editingData={editingData}
      ></Output>
      <button
        id="form-clear-all-button"
        onClick={() => {
          setList((data) => []);
          setAlert((data) => {
            return {
              ...data,
              alert: true,
              message: `Deleted all items in list`,
              type: "delete",
            };
          });
        }}
      >
        Clear Items
      </button>
    </div>
  );
};

const Heading = () => {
  return <h1 id="play-area-heading">Grocery Bud</h1>;
};

const Input = ({ input, setInput, savingData, edit }) => {
  return (
    <section id="play-area-form-area">
      <form onSubmit={savingData} id="play-area-form">
        <input
          type="text"
          placeholder="e.g. eggs"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          id="play-area-form-input"
        ></input>
        <button type="submit" id="play-area-form-submit">
          {" "}
          {edit === true ? "Edit" : "Submit"}
        </button>
      </form>
    </section>
  );
};

const Output = ({ list, deletingData, editingData }) => {
  return (
    <>
      {list.map((data, index) => (
        <div key={index} className="output">
          <p>{data}</p>
          <section>
            <IoPencil
              className="editPencil"
              onClick={() => editingData(data)}
            ></IoPencil>
            <IoTrashOutline
              className="trash"
              onClick={() => deletingData(data)}
            ></IoTrashOutline>
          </section>
        </div>
      ))}
    </>
  );
};

const Alert = ({ alert, list, setAlert }) => {
  const { message, type } = alert;
  useEffect(() => {
    setTimeout(() => {
      setAlert((data) => {
        return { ...data, alert: false };
      });
    }, 4000);
  }, [list]);
  return (
    <div id="alert" className={`alert-${type}`}>
      {message}
    </div>
  );
};
