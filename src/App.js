import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import ExcelDataRender from "./components/ExcelDataRenderer";

const App = () => {
  const [excelFileData, setExcelFileData] = useState([]);
  const [fileName, setFileName] = useState("");

  const changeHandler = (event) => {
    if (
      event.target.files[0].type === "application/vnd.ms-excel" ||
      event.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      apicall(event.target.files[0]);
    }
  };

  const apicall = (fileData) => {
    const data = new FormData();
    data.append("file", fileData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const progress = Math.round((loaded * 100) / total);
        console.log(`File upload progress: ${progress}%`);
      },
    };

    axios
      .post("http://localhost:8000/upload", data, config)
      .then((response) => response.data)
      .then(
        (result) => {
          document.getElementById("uploadFile").value = "";
          const { excelData, filename } = result.data[0];
          setExcelFileData(excelData);
          setFileName(filename);
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
      {excelFileData.length > 0 ? (
        <ExcelDataRender excelData={excelFileData} fileName={fileName} />
      ) : null}
    </div>
  );
};

export default App;
