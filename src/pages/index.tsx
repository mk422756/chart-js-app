import Head from "next/head"
import { Inter } from "@next/font/google"
import React, { useState } from "react"
import CerealClient from "src/client/cereal-client"
import { Cereal } from "src/types/cereal"
import ParamSelectBox from "src/components/ParamSelectBox"
import { cerealKeys } from "src/constants/cereals"
import ChartBox from "src/components/ChartBox"

const inter = Inter({ subsets: ["latin"] })

interface Props {
  cereals: Cereal[]
}

export default function Home(props: Props) {
  const [xParam, setXparam] = useState(cerealKeys[0]) // calories
  const [yParam, setYparam] = useState(cerealKeys[5]) // carbo

  function changeXparam(event: React.ChangeEvent<HTMLSelectElement>) {
    setXparam(event.target.value)
  }

  function changeYparam(event: React.ChangeEvent<HTMLSelectElement>) {
    setYparam(event.target.value)
  }

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
          <ParamSelectBox
            value={xParam}
            label={"X軸"}
            onChange={changeXparam}
          />
          <ParamSelectBox
            value={yParam}
            label={"Y軸"}
            onChange={changeYparam}
          />
          <ChartBox cereals={props.cereals} xParam={xParam} yParam={yParam} />
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
