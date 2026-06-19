import { useEffect, useState } from "react";
import api from "../services/api";
import {
FaMoneyBillWave,
FaClipboardList,
} from "react-icons/fa";

function SummaryCards({
refresh,
selectedMonth,
selectedYear,
}) {
const [summary, setSummary] = useState({
total_entries: 0,
total_expense: 0,
});

useEffect(() => {
fetchSummary();
}, [
refresh,
selectedMonth,
selectedYear,
]);

const fetchSummary = async () => {
try {
const response = await api.get(
`/expenses/summary?month=${selectedMonth}&year=${selectedYear}`
);

  setSummary(response.data);

} catch (error) {
  console.error(error);
}


};

return (
<div
style={{
display: "flex",
gap: "20px",
flexWrap: "wrap",
}}
>
<div
style={{
background: "#FFFFFF",
borderRadius: "18px",
padding: "25px",
minWidth: "260px",
boxShadow:
"0 4px 15px rgba(0,0,0,0.08)",
borderLeft:
"6px solid #4CAF50",
}}
>
<div
style={{
display: "flex",
alignItems: "center",
gap: "12px",
marginBottom: "15px",
}}
> <FaMoneyBillWave
         size={28}
         color="#2E7D32"
       />

      <h3
        style={{
          margin: 0,
          color: "#607D8B",
        }}
      >
        Total Expense
      </h3>
    </div>

    <h1
      style={{
        margin: 0,
        color: "#263238",
        fontSize: "32px",
      }}
    >
      ₹ {summary.total_expense}
    </h1>

    <p
      style={{
        marginTop: "10px",
        color: "#81C784",
      }}
    >
      Selected Month Summary
    </p>
  </div>

  <div
    style={{
      background: "#FFFFFF",
      borderRadius: "18px",
      padding: "25px",
      minWidth: "260px",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.08)",
      borderLeft:
        "6px solid #81C784",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "15px",
      }}
    >
      <FaClipboardList
        size={28}
        color="#2E7D32"
      />

      <h3
        style={{
          margin: 0,
          color: "#607D8B",
        }}
      >
        Total Entries
      </h3>
    </div>

    <h1
      style={{
        margin: 0,
        color: "#263238",
        fontSize: "32px",
      }}
    >
      {summary.total_entries}
    </h1>

    <p
      style={{
        marginTop: "10px",
        color: "#81C784",
      }}
    >
      Expenses Recorded
    </p>
  </div>
</div>


);
}

export default SummaryCards;
