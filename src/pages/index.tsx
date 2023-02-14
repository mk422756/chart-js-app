import Head from "next/head"
import { Inter } from "@next/font/google"
import React, { useState } from "react"
import Chart from "chart.js/auto"
import CerealClient from "src/client/cereal-client"
import { Cereal } from "src/types/cereal"

const inter = Inter({ subsets: ["latin"] })

interface Props {
  cereals: Cereal[]
}

export default function Home(props: Props) {
  const [xParam, setXparam] = useState("calories")
  const [yParam, setYparam] = useState("carbo")

  function changeXparam(event: React.ChangeEvent<HTMLSelectElement>) {
    setXparam(event.target.value)
  }

  function changeYparam(event: React.ChangeEvent<HTMLSelectElement>) {
    setYparam(event.target.value)
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  React.useEffect(() => {
    let myChart: any = null
    const cereals = props.cereals.map((cereal: any) => {
      return { x: cereal[xParam], y: cereal[yParam] }
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
              text: capitalizeFirstLetter(xParam),
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
              text: capitalizeFirstLetter(yParam),
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
  }, [xParam, yParam])

  return (
    <>
      <Head>
        <title>chart-js-app</title>
        <meta name="description" content="Chart.jsで散布図を表示するアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section style={{ padding: "10pt" }}>
          <h1>chart-js-app</h1>
          <p>シリアルのデータ</p>
          <div>
            <label>
              X軸:
              <select value={xParam} onChange={changeXparam}>
                <option value="calories">Calories</option>
                <option value="protein">Protein</option>
                <option value="fat">Fat</option>
                <option value="sodium">Sodium</option>
                <option value="fiber">Fiber</option>
                <option value="carbo">Carbo</option>
                <option value="sugars">Sugars</option>
                <option value="potass">Potass</option>
                <option value="vitamins">Vitamins</option>
                <option value="shelf">Shelf</option>
                <option value="weight">Weight</option>
                <option value="cups">Cups</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Y軸:
              <select value={yParam} onChange={changeYparam}>
                <option value="calories">Calories</option>
                <option value="protein">Protein</option>
                <option value="fat">Fat</option>
                <option value="sodium">Sodium</option>
                <option value="fiber">Fiber</option>
                <option value="carbo">Carbo</option>
                <option value="sugars">Sugars</option>
                <option value="potass">Potass</option>
                <option value="vitamins">Vitamins</option>
                <option value="shelf">Shelf</option>
                <option value="weight">Weight</option>
                <option value="cups">Cups</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>
          <div style={{ width: "400pt" }}>
            <canvas id="myChart" width="300" height="300"></canvas>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const client = new CerealClient()
  const cereals = await client.fetch()
  return {
    props: { cereals },
  }
}
