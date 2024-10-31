import React from "react";
import ReactECharts from "echarts-for-react";
import {
  getColors,
  getGrays,
  getPosition,
  themeColors,
} from "../../../helpers/utils.js";
const TauxDeRecouvrement = () => {
  // Les données qu'on souhaites afficher
  const data = [120, 200, 150, 80, 70, 110, 120];

  // Utilisation des helpers pour récupérer les couleurs ou autres options
  const colors = getColors();
  const grays = getGrays();

  const options = {
    tooltip: {
      trigger: "axis",
      padding: [7, 10],
      formatter: "{b0} : {c0}",
      transitionDuration: 0,
      backgroundColor: grays[100],
      borderColor: grays[300],
      textStyle: {
        color: colors.dark,
      },
      borderWidth: 1,
      position: function (pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
    },
    xAxis: {
      type: "category",
      data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        type: "none",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        type: "none",
      },
    },
    series: [
      {
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: grays[200],
          borderRadius: 10,
        },
        barWidth: "5px",
        itemStyle: {
          borderRadius: 10,
          color: colors.primary,
        },
        data: data,
        animationDuration: 1200,
        z: 10,
        emphasis: {
          itemStyle: {
            color: colors.primary,
          },
        },
      },
    ],
    grid: {
      right: 5,
      left: 10,
      top: 0,
      bottom: 0,
    },
  };

  return (
    <ReactECharts option={options} style={{ height: "4rem", width: "100%" }} />
  );
};

export default TauxDeRecouvrement;
