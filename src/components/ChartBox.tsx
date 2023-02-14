import React from "react"
import Chart from "chart.js/auto"
import { Cereal } from "src/types/cereal"
import { capitalizeFirstLetter } from "src/util/util"

interface Props {
  cereals: Cereal[]
  xParam: string
  yParam: string
}

export default function ChartBox(props: Props) {
  React.useEffect(() => {
    let myChart: any = null
    const cereals = props.cereals.map((cereal: any) => {
      return { x: cereal[props.xParam], y: cereal[props.yParam] }
    })
    const config: any = {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "80 Cereals",
            backgroundColor: "rgb(255, 99, 132)",
            data: cereals,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: capitalizeFirstLetter(props.xParam),
              font: {
                size: 20,
                weight: "bold",
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: capitalizeFirstLetter(props.yParam),
              font: {
                size: 20,
                weight: "bold",
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
        },
      },
    }
    myChart = new Chart(
      document.getElementById("myChart") as HTMLCanvasElement,
      config
    )
    return () => {
      myChart.destroy()
    }
  }, [props.xParam, props.yParam, props.cereals])

  return (
    <div style={{ width: "400pt" }}>
      <canvas id="myChart" width="300" height="300"></canvas>
    </div>
  )
}
