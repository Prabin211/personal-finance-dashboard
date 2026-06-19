import { useEffect, useState } from "react";
import api from "../services/api";
import {
FaEdit,
FaTrash,
FaSave,
FaTimes,
} from "react-icons/fa";

function ExpenseTable({
refresh,
triggerRefresh,
selectedMonth,
selectedYear,
}) {
const [expenses, setExpenses] =
useState([]);

const [editingId, setEditingId] =
useState(null);

const [editData, setEditData] =
useState({
amount: "",
category: "",
month: "",
year: "",
});

const fetchExpenses =
async () => {
try {
const response =
await api.get(
`/expenses?month=${selectedMonth}&year=${selectedYear}`
);


    setExpenses(
      response.data
    );

  } catch (error) {
    console.error(error);
  }
};


useEffect(() => {
fetchExpenses();
}, [
refresh,
selectedMonth,
selectedYear,
]);

const handleDelete =
async (id) => {
const confirmDelete =
window.confirm(
"Are you sure you want to delete this expense?"
);

  if (!confirmDelete)
    return;

  try {
    await api.delete(
      `/expenses/${id}`
    );

    fetchExpenses();

    if (
      triggerRefresh
    ) {
      triggerRefresh();
    }

  } catch (error) {
    console.error(error);
  }
};


const startEdit = (
expense
) => {
setEditingId(
expense.id
);


setEditData({
  amount:
    expense.amount,
  category:
    expense.category,
  month:
    expense.month,
  year:
    expense.year,
});


};

const saveEdit =
async () => {
try {
await api.put(
`/expenses/${editingId}`,
{
amount:
Number(
editData.amount
),
category:
editData.category,
month:
Number(
editData.month
),
year:
Number(
editData.year
),
}
);

    setEditingId(null);

    fetchExpenses();

    if (
      triggerRefresh
    ) {
      triggerRefresh();
    }

  } catch (error) {
    console.error(error);
  }
};


const inputStyle = {
padding: "8px",
borderRadius: "8px",
border:
"1px solid #DCE5DC",
};

return ( <div>
<h2
style={{
color: "#2E7D32",
marginBottom:
"20px",
}}
>
📋 Expense Records </h2>

  <div
    style={{
      overflowX: "auto",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse:
          "collapse",
        background:
          "#FFFFFF",
      }}
    >
      <thead>
        <tr
          style={{
            background:
              "#4CAF50",
            color:
              "#FFFFFF",
          }}
        >
          <th
            style={{
              padding:
                "14px",
            }}
          >
            ID
          </th>

          <th
            style={{
              padding:
                "14px",
            }}
          >
            Category
          </th>

          <th
            style={{
              padding:
                "14px",
            }}
          >
            Amount
          </th>

          <th
            style={{
              padding:
                "14px",
            }}
          >
            Month
          </th>

          <th
            style={{
              padding:
                "14px",
            }}
          >
            Year
          </th>

          <th
            style={{
              padding:
                "14px",
            }}
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {expenses.map(
          (
            expense,
            index
          ) => (
            <tr
              key={
                expense.id
              }
              style={{
                background:
                  index %
                    2 ===
                  0
                    ? "#FFFFFF"
                    : "#F7FBF7",
                borderBottom:
                  "1px solid #E8F0E8",
              }}
            >
              <td
                style={{
                  padding:
                    "12px",
                }}
              >
                {
                  expense.id
                }
              </td>

              <td
                style={{
                  padding:
                    "12px",
                }}
              >
                {editingId ===
                expense.id ? (
                  <select
                    value={
                      editData.category
                    }
                    onChange={(
                      e
                    ) =>
                      setEditData(
                        {
                          ...editData,
                          category:
                            e
                              .target
                              .value,
                        }
                      )
                    }
                    style={
                      inputStyle
                    }
                  >
                    <option>
                      Food
                    </option>
                    <option>
                      Rent
                    </option>
                    <option>
                      Transportation
                    </option>
                    <option>
                      Shopping
                    </option>
                    <option>
                      Entertainment
                    </option>
                    <option>
                      Gym
                    </option>
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
                ) : (
                  expense.category
                )}
              </td>

              <td
                style={{
                  padding:
                    "12px",
                }}
              >
                {editingId ===
                expense.id ? (
                  <input
                    type="number"
                    value={
                      editData.amount
                    }
                    onChange={(
                      e
                    ) =>
                      setEditData(
                        {
                          ...editData,
                          amount:
                            e
                              .target
                              .value,
                        }
                      )
                    }
                    style={
                      inputStyle
                    }
                  />
                ) : (
                  `₹${expense.amount}`
                )}
              </td>

              <td
                style={{
                  padding:
                    "12px",
                }}
              >
                {editingId ===
                expense.id ? (
                  <input
                    type="number"
                    value={
                      editData.month
                    }
                    onChange={(
                      e
                    ) =>
                      setEditData(
                        {
                          ...editData,
                          month:
                            e
                              .target
                              .value,
                        }
                      )
                    }
                    style={
                      inputStyle
                    }
                  />
                ) : (
                  expense.month
                )}
              </td>

              <td
                style={{
                  padding:
                    "12px",
                }}
              >
                {editingId ===
                expense.id ? (
                  <input
                    type="number"
                    value={
                      editData.year
                    }
                    onChange={(
                      e
                    ) =>
                      setEditData(
                        {
                          ...editData,
                          year:
                            e
                              .target
                              .value,
                        }
                      )
                    }
                    style={
                      inputStyle
                    }
                  />
                ) : (
                  expense.year
                )}
              </td>

              <td
                style={{
                  padding:
                    "12px",
                }}
              >
                {editingId ===
                expense.id ? (
                  <>
                    <button
                      onClick={
                        saveEdit
                      }
                      style={{
                        background:
                          "#4CAF50",
                        color:
                          "#FFFFFF",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                        marginRight:
                          "8px",
                      }}
                    >
                      <FaSave />
                    </button>

                    <button
                      onClick={() =>
                        setEditingId(
                          null
                        )
                      }
                      style={{
                        background:
                          "#757575",
                        color:
                          "#FFFFFF",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                      }}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        startEdit(
                          expense
                        )
                      }
                      style={{
                        background:
                          "#4CAF50",
                        color:
                          "#FFFFFF",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                        marginRight:
                          "8px",
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          expense.id
                        )
                      }
                      style={{
                        background:
                          "#E53935",
                        color:
                          "#FFFFFF",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
</div>


);
}

export default ExpenseTable;
