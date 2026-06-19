import { useEffect, useState } from "react";
import api from "../services/api";
import { FaTrophy } from "react-icons/fa";

function HighestCategoryCard({
selectedMonth,
selectedYear,
}) {
const [data, setData] =
useState({});

useEffect(() => {
fetchData();
}, [
selectedMonth,
selectedYear,
]);

const fetchData = async () => {
try {
const response =
await api.get(
`/expenses/highest-category?month=${selectedMonth}&year=${selectedYear}`
);


  setData(response.data);

} catch (error) {
  console.error(error);
}


};

return (
<div
style={{
background: "#FFFFFF",
borderRadius: "18px",
padding: "25px",
minWidth: "260px",
boxShadow:
"0 4px 15px rgba(0,0,0,0.08)",
borderLeft:
"6px solid #2E7D32",
}}
>
<div
style={{
display: "flex",
alignItems: "center",
gap: "12px",
marginBottom: "15px",
}}
> <FaTrophy
       size={28}
       color="#2E7D32"
     />


    <h3
      style={{
        margin: 0,
        color: "#607D8B",
      }}
    >
      Highest Category
    </h3>
  </div>

  <h2
    style={{
      margin: 0,
      color: "#263238",
      fontSize: "28px",
    }}
  >
    {data.category || "N/A"}
  </h2>

  <h1
    style={{
      marginTop: "12px",
      marginBottom: "0",
      color: "#2E7D32",
      fontSize: "32px",
    }}
  >
    ₹ {data.total || 0}
  </h1>

  <p
    style={{
      marginTop: "10px",
      color: "#81C784",
    }}
  >
    Top spending category
  </p>
</div>

);
}

export default HighestCategoryCard;
