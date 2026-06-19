import { useEffect, useState } from "react";
import api from "../services/api";

import {
PieChart,
Pie,
Tooltip,
Legend,
Cell,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
ResponsiveContainer,
} from "recharts";

function CategoryChart({
refresh,
selectedMonth,
selectedYear,
chartView,
}) {
const [data, setData] =
useState([]);

useEffect(() => {
fetchCategoryTotals();
}, [
refresh,
selectedMonth,
selectedYear,
chartView,
]);

const fetchCategoryTotals =
async () => {
try {
let response;


    if (
      chartView ===
      "category"
    ) {
      response =
        await api.get(
          `/expenses/category-totals?month=${selectedMonth}&year=${selectedYear}`
        );

      const formattedData =
        response.data.map(
          (item) => ({
            category:
              item.category,
            total:
              Number(
                item.total
              ),
          })
        );

      setData(
        formattedData
      );

    } else if (
      chartView ===
      "month"
    ) {
      response =
        await api.get(
          "/expenses/monthly-analysis"
        );

      const monthNames =
        [
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

      const formattedData =
        response.data.map(
          (item) => ({
            label: `${monthNames[item.month]} ${item.year}`,
            total:
              Number(
                item.total
              ),
          })
        );

      setData(
        formattedData
      );

    } else {
      response =
        await api.get(
          "/expenses/yearly-analysis"
        );

      const formattedData =
        response.data.map(
          (item) => ({
            label:
              item.year,
            total:
              Number(
                item.total
              ),
          })
        );

      setData(
        formattedData
      );
    }

  } catch (error) {
    console.error(
      error
    );
  }
};


const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#00E396",
];

return ( <div>



  <div
    style={{
      background:
        "#FFFFFF",
      borderRadius:
        "16px",
      padding:
        "20px",
      minHeight:
        "450px",
      display:
        "flex",
      justifyContent:
        "center",
      alignItems:
        "center",
    }}
  >
    {chartView ===
    "category" ? (
      <PieChart
        width={700}
        height={400}
      >
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          outerRadius={
            140
          }
          label
        >
          {data.map(
            (
              entry,
              index
            ) => (
              <Cell
                key={
                  index
                }
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    ) : (
      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <BarChart
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="label"
          />

          <YAxis />

          <Tooltip />

          <Bar
              dataKey="total"
              fill="#0088FE"
              radius={[8, 8, 0, 0]}
            />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
</div>


);
}

export default CategoryChart;
