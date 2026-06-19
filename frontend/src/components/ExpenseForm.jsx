import { useState } from "react";
import api from "../services/api";
import { FaPlusCircle } from "react-icons/fa";

function ExpenseForm({
triggerRefresh,
}) {
const [category, setCategory] =
useState("Food");

const [amount, setAmount] =
useState("");

const [month, setMonth] =
useState(
new Date().getMonth() + 1
);

const [year, setYear] =
useState(
new Date().getFullYear()
);

const handleSubmit = async (
e
) => {
e.preventDefault();

```
try {
  await api.post(
    "/expenses",
    {
      amount:
        Number(amount),
      category,
      month,
      year,
    }
  );

  triggerRefresh();

  alert(
    "Expense Added Successfully"
  );

  setAmount("");

} catch (error) {
  console.error(error);

  alert(
    "Failed to add expense"
  );
}
```

};

const inputStyle = {
padding: "12px",
borderRadius: "10px",
border:
"1px solid #DCE5DC",
minWidth: "180px",
fontSize: "14px",
background: "#FFFFFF",
};

return ( <div>
<h2
style={{
color: "#2E7D32",
marginBottom: "20px",
}}
>
💰 Add New Expense </h2>

  <form
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    <select
      value={category}
      onChange={(e) =>
        setCategory(
          e.target.value
        )
      }
      style={inputStyle}
    >
      <option>Food</option>
      <option>Rent</option>
      <option>
        Transportation
      </option>
      <option>
        Shopping
      </option>
      <option>
        Entertainment
      </option>
      <option>Gym</option>
      <option>
        Medical
      </option>
      <option>
        Education
      </option>
      <option>
        Travel
      </option>
      <option>
        Utilities
      </option>
      <option>
        Others
      </option>
    </select>

    <select
      value={month}
      onChange={(e) =>
        setMonth(
          Number(
            e.target.value
          )
        )
      }
      style={inputStyle}
    >
      <option value="1">
        January
      </option>
      <option value="2">
        February
      </option>
      <option value="3">
        March
      </option>
      <option value="4">
        April
      </option>
      <option value="5">
        May
      </option>
      <option value="6">
        June
      </option>
      <option value="7">
        July
      </option>
      <option value="8">
        August
      </option>
      <option value="9">
        September
      </option>
      <option value="10">
        October
      </option>
      <option value="11">
        November
      </option>
      <option value="12">
        December
      </option>
    </select>

    <input
      type="number"
      value={year}
      onChange={(e) =>
        setYear(
          Number(
            e.target.value
          )
        )
      }
      style={inputStyle}
    />

    <input
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) =>
        setAmount(
          e.target.value
        )
      }
      required
      style={inputStyle}
    />

    <button
      type="submit"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background:
          "#4CAF50",
        color: "#FFFFFF",
        border: "none",
        padding:
          "12px 20px",
        borderRadius:
          "10px",
        cursor: "pointer",
        fontWeight: "600",
        boxShadow:
          "0 4px 10px rgba(76,175,80,0.3)",
      }}
    >
      <FaPlusCircle />

      Add Expense
    </button>
  </form>
</div>


);
}

export default ExpenseForm;
