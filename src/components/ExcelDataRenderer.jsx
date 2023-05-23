import React from "react";

const ExcelDataRender = ({ excelData, fileName }) => {
  const invalidRows = [];
  const tableData = excelData.map((data, index) => {
    const { hasInvalidFields, ...rowData } = data; // Destructure the data object and exclude the "hasInvalidFields" property
    if (hasInvalidFields) {
      invalidRows.push(index); // Add the index property to the rowData object
    }
    return rowData;
  });

  return (
    <div>
      <h2>{fileName}</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{ border: "1px solid black", width: "500px", height: "auto" }}
        >
          <thead style={{ backgroundColor: "aliceblue", fontSize: "1.5rem" }}>
            <tr>
              {Object.keys(tableData[0]).map((key) => (
                <th style={{ border: "1px solid black" }} key={key}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ fontSize: "1.25rem" }}>
            {tableData.map((data, index) => (
              <tr
                key={index}
                style={{
                  border: "1px solid black",
                  backgroundColor: invalidRows.includes(index)
                    ? "red"
                    : "white",
                }}
              >
                {Object.values(data).map((value, index) => (
                  <td
                    style={{ border: "1px solid black", width: "150px" }}
                    key={index}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {invalidRows.map((data) => {
          return <div> Row number : {data + 1} contains invalid data</div>;
        })}
      </div>
    </div>
  );
};

export default ExcelDataRender;
