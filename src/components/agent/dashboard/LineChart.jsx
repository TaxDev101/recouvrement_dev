import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  getColors,
  getGrays,
  themeColors,
  rgbaColor,
} from "../../../helpers/utils.js";

const LineChart = () => {
  const dataset = {
    all: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    successful: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    failed: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
  };

  const labels = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
  ];

  const [chartData, setChartData] = useState(dataset.successful);

  const getDefaultOptions = () => {
    const gray = getGrays();

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        padding: [7, 10],
        backgroundColor: gray[100],
        borderColor: gray[300],
        borderWidth: 1,
        formatter: (params) =>
          `${params[0].axisValue} - ${params[0].value} USD`,
        textStyle: {
          fontWeight: 500,
          fontSize: 12,
          color: getColors().dark,
        },
      },
      xAxis: {
        type: "category",
        data: labels,
        splitLine: {
          show: true,
          lineStyle: {
            color: rgbaColor("#fff", 0.1),
          },
        },
        axisLine: {
          lineStyle: {
            color: rgbaColor("#fff", 0.1),
          },
        },
        axisLabel: {
          color: gray[400],
          fontWeight: 600,
          fontSize: 12,
          margin: 15,
          interval: window.innerWidth < 768 ? "auto" : 0,
        },
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
        axisPointer: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          type: "line",
          smooth: true,
          data: chartData.map((d) => (d * 3.14).toFixed(2)),
          animationDuration: 1200,
          itemStyle: {
            color:
              localStorage.getItem("theme") === "light"
                ? gray.white
                : themeColors.primary,
          },
          lineStyle: {
            color:
              localStorage.getItem("theme") === "light"
                ? rgbaColor(gray.white, 0.8)
                : themeColors.primary,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color:
                    localStorage.getItem("theme") === "light"
                      ? "rgba(255, 255, 255, 0.5)"
                      : rgbaColor(themeColors.primary, 0.5),
                },
                {
                  offset: 1,
                  color:
                    localStorage.getItem("theme") === "light"
                      ? "rgba(255, 255, 255, 0)"
                      : rgbaColor(themeColors.primary, 0),
                },
              ],
            },
          },
          emphasis: {
            lineStyle: {
              width: 2,
            },
          },
        },
      ],
      grid: {
        right: 15,
        left: 15,
        bottom: "15%",
        top: 0,
      },
    };
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setChartData(dataset[value]);
  };

  useEffect(() => {
    const selectMenu = document.getElementById("dashboard-chart-select");
    if (selectMenu) {
      selectMenu.addEventListener("change", handleChange);
    }

    // Clean up event listener on unmount
    return () => {
      if (selectMenu) {
        selectMenu.removeEventListener("change", handleChange);
      }
    };
  }, []);

  return (
    <div className="col-xxl-9">
      <div className="card rounded-3 overflow-hidden h-100">
        <div className="card-body bg-line-chart-gradient d-flex flex-column justify-content-between">
          <div className="row align-items-center g-0">
            <div className="col light">
              <h4 className="text-white mb-0">Exemple 764.39 Ar</h4>
              <p className="fs--1 fw-semi-bold text-white">
                exemple <span className="opacity-50">684.87 Ar</span>
              </p>
            </div>
            <div className="col-auto d-none d-sm-block">
              <select
                className="form-select form-select-sm mb-3"
                id="dashboard-chart-select"
                defaultValue="successful"
              >
                <option value="all">2022</option>
                <option value="successful">2023</option>
                <option value="failed">2024</option>
              </select>
            </div>
          </div>

          <div style={{ height: "200px" }} data-echart-responsive="true">
            <ReactECharts
              option={getDefaultOptions()}
              style={{ height: "200px" }}
              data-echart-responsive="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
