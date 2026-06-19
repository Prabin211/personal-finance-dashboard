import { useState } from "react";
import api from "../services/api";
import { FaUpload } from "react-icons/fa";

function ImportExpenses({
triggerRefresh,
}) {
const [file, setFile] =
useState(null);

const handleUpload = async () => {
if (!file) {
alert(
"Please select a file"
);
return;
}

const formData =
  new FormData();

formData.append(
  "file",
  file
);

try {
  const response =
    await api.post(
      "/expenses/import",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  alert(
    `Imported ${response.data.insertedRows} rows successfully`
  );

  if (triggerRefresh) {
    triggerRefresh();
  }

  setFile(null);

} catch (error) {
  console.error(error);

  alert("Import failed");
}


};

return (
<div
style={{
display: "flex",
alignItems: "center",
gap: "15px",
flexWrap: "wrap",
}}
> <div>
<h3
style={{
margin: 0,
color: "#2E7D32",
}}
>
📤 Import Data </h3>

    <p
      style={{
        margin: 0,
        color: "#607D8B",
        fontSize: "14px",
      }}
    >
      Upload Excel or CSV
      files
    </p>
  </div>

  <input
    type="file"
    accept=".xlsx,.csv"
    onChange={(e) =>
      setFile(
        e.target.files[0]
      )
    }
    style={{
      padding: "8px",
      border:
        "1px solid #DCE5DC",
      borderRadius: "8px",
      background: "#FFFFFF",
    }}
  />

  <button
    onClick={handleUpload}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background:
        "#4CAF50",
      color: "#FFFFFF",
      border: "none",
      padding:
        "10px 18px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      boxShadow:
        "0 4px 10px rgba(76,175,80,0.3)",
    }}
  >
    <FaUpload />

    Upload
  </button>

  {file && (
    <span
      style={{
        color: "#2E7D32",
        fontWeight: "500",
      }}
    >
      {file.name}
    </span>
  )}
</div>

);
}

export default ImportExpenses;
