import React, { useEffect, useState } from "react";
import "../css/Summary.css";
import AttendanceLineChart from "./AttendanceLineChart";
import AttendanceDonutChart from "./AttendanceDonutChart";
import axios from "axios";

function Summary() {
  const [trendData, setTrendData] = useState([]);
  const [donutData, setDonutData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/attendance");

        // Class-wise attendance % (donut chart)
        const classMap = {};
        res.data.forEach((a) => {
          const cls = a.student.studentClass;
          if (!classMap[cls]) classMap[cls] = { total: 0, present: 0 };
          classMap[cls].total += 1;
          if (a.status === "Present") classMap[cls].present += 1;
        });
        const donut = Object.keys(classMap).map((cls) => ({
          name: cls,
          value: ((classMap[cls].present / classMap[cls].total) * 100).toFixed(2),
        }));
        setDonutData(donut);

        // Daily attendance trend (line chart)
        const dateMap = {};
        res.data.forEach((a) => {
          const date = new Date(a.date).toLocaleDateString();
          if (!dateMap[date]) dateMap[date] = 0;
          if (a.status === "Present") dateMap[date] += 1;
        });
        const trend = Object.keys(dateMap).map((date) => ({
          date,
          attendance: dateMap[date],
        }));
        setTrendData(trend);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttendance();
  }, []);

  const avgAttendance = donutData.length
    ? (donutData.reduce((sum, cls) => sum + parseFloat(cls.value), 0) / donutData.length).toFixed(2)
    : 0;

  return (
    <div className="dashboard">
      <main className="main">
        {/* Charts */}
        <section className="charts">
          <div className="chart">
            <h3>Student Attendance Trend</h3>
            <AttendanceLineChart data={trendData} />
          </div>

          <div className="income">
            <h3>Class-wise Attendance %</h3>
            <AttendanceDonutChart data={donutData} />
            <h2>{avgAttendance}%</h2>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Summary;
