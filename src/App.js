import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    if (
      event.target.files[0].type === "application/vnd.ms-excel" ||
      event.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setTimeout(() => {
        apicall();
      }, 1500);
    }
  };

  const apicall = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    console.log(data);
    axios
      .post("http://localhost:8000/upload", data)
      .then((response) => response.data)
      .then(
        (result) => {
          document.getElementById("uploadFile").value = "";
        },
        (err) => {
          document.getElementById("uploadFile").value = "";
        }
      );
  };

  return (
    <div className="App">
      <input
        type="file"
        id="uploadFile"
        single
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={changeHandler}
      ></input>
    </div>
  );
};

export default App;
