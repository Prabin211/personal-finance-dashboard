import { useEffect, useState } from "react";
import api from "../services/api";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
} from "recharts";

function MonthlyTrendChart({ refresh }) {
const [data, setData] = useState([]);

useEffect(() => {
fetchTrend();
}, [refresh]);

const fetchTrend = async () => {
try {
const response = await api.get(
"/expenses/monthly-trend"
);

  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedData = response.data.map(
    (item) => ({
      month: `${monthNames[item.month]} ${item.year}`,
      total: Number(item.total),
    })
  );

  setData(formattedData);

} catch (error) {
  console.error(error);
}


};

return ( <div> <h2>Monthly Expense Trend</h2>

  <LineChart
    width={700}
    height={300}
    data={data}
  >
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="month" />

    <YAxis />

    <Tooltip />

    <Line
      type="monotone"
      dataKey="total"
    />
  </LineChart>
</div>


);
}

export default MonthlyTrendChart;
