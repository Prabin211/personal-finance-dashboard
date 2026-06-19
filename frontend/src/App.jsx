import { useState } from "react";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import CategoryChart from "./components/CategoryChart";
import HighestCategoryCard from "./components/HighestCategoryCard";
import ImportExpenses from "./components/ImportExpenses";

function App() {
  const [refresh, setRefresh] = useState(false);

  const [selectedMonth, setSelectedMonth] =
    useState(new Date().getMonth() + 1);

  const [selectedYear, setSelectedYear] =
    useState(new Date().getFullYear());

  const [chartView, setChartView] =
    useState("category");

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F9F4",
        minHeight: "100vh",
        padding: "40px",
        maxWidth: "1500px",
        margin: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "30px",
          background:
            "linear-gradient(135deg,#4CAF50,#81C784)",
          padding: "30px",
          borderRadius: "20px",
          color: "white",
          boxShadow:
            "0 8px 20px rgba(76,175,80,0.25)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "42px",
            color: "white",
          }}
        >
          🌿 Personal Finance Dashboard
        </h1>

        <p
          style={{
            marginTop: "10px",
            opacity: "0.95",
            color: "white",
          }}
        >
          Track and analyze your expenses with smart insights
        </p>
      </div>

      {/* Filters & Import */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "25px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label
            style={{
              fontWeight: "bold",
              color: "#2E7D32",
            }}
          >
            Month:
          </label>

          <select
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(
                Number(e.target.value)
              )
            }
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div>
          <label
            style={{
              fontWeight: "bold",
              color: "#2E7D32",
            }}
          >
            Year:
          </label>

          <input
            type="number"
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(
                Number(e.target.value)
              )
            }
            style={{
              marginLeft: "10px",
              width: "100px",
              padding: "8px",
              borderRadius: "8px",
            }}
          />
        </div>

        <ImportExpenses
          triggerRefresh={triggerRefresh}
        />
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <SummaryCards
          refresh={refresh}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />

        <HighestCategoryCard
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>

      {/* Analytics */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "20px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              color: "#2E7D32",
              margin: 0,
            }}
          >
            📊 Expense Analytics
          </h2>

          <select
            value={chartView}
            onChange={(e) =>
              setChartView(
                e.target.value
              )
            }
            style={{
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <option value="category">
              Category
            </option>
            <option value="month">
              Month
            </option>
            <option value="year">
              Year
            </option>
          </select>
        </div>

        <CategoryChart
          refresh={refresh}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          chartView={chartView}
        />
      </div>

      {/* Expense Form */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            color: "#2E7D32",
            marginBottom: "15px",
          }}
        >
        </h2>

        <ExpenseForm
          triggerRefresh={triggerRefresh}
        />
      </div>

      {/* Expense Table */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "20px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#2E7D32",
            marginBottom: "15px",
          }}
        >
        </h2>

        <ExpenseTable
          refresh={refresh}
          triggerRefresh={triggerRefresh}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
    </div>
  );
}

export default App;