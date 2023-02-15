import Head from "next/head"
import { Inter } from "@next/font/google"
import React, { useEffect, useState } from "react"
import CerealClient from "src/client/cereal-client"
import { Cereal } from "src/types/cereal"
import ParamSelectBox from "src/components/ParamSelectBox"
import { cerealKeys, mfrKeys, typeKeys } from "src/constants/cereals"
import ChartBox from "src/components/ChartBox"

const inter = Inter({ subsets: ["latin"] })

interface Props {
  cereals: Cereal[]
}

export default function Home(props: Props) {
  const [cereals, setCereals] = useState(props.cereals)
  const [type, setType] = useState(typeKeys[0]) // ALL
  const [mfr, setMfr] = useState(mfrKeys[0]) // ALL

  const [xParam, setXparam] = useState(cerealKeys[0]) // calories
  const [yParam, setYparam] = useState(cerealKeys[5]) // carbo

  useEffect(() => {
    const filtered = props.cereals.filter((cereal) => {
      if (type === "ALL" && mfr === "ALL") {
        return true
      } else if (type === "ALL" && mfr !== "ALL") {
        return cereal.mfr === mfr
      } else if (type !== "ALL" && mfr === "ALL") {
        return cereal.type === type
      } else {
        return cereal.type === type && cereal.mfr === mfr
      }
    })
    setCereals(filtered)
  }, [type, mfr, props.cereals])

  function changeXparam(event: React.ChangeEvent<HTMLSelectElement>) {
    setXparam(event.target.value)
  }

  function changeYparam(event: React.ChangeEvent<HTMLSelectElement>) {
    setYparam(event.target.value)
  }

  function changeTypeParam(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.target.value)
  }

  function changeMfrParam(event: React.ChangeEvent<HTMLSelectElement>) {
    setMfr(event.target.value)
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
            value={type}
            label={"Type"}
            optionsValue={typeKeys}
            onChange={changeTypeParam}
          />
          <ParamSelectBox
            value={mfr}
            label={"MFR"}
            optionsValue={mfrKeys}
            onChange={changeMfrParam}
          />
          <ParamSelectBox
            value={xParam}
            label={"X軸"}
            optionsValue={cerealKeys}
            onChange={changeXparam}
          />
          <ParamSelectBox
            value={yParam}
            label={"Y軸"}
            optionsValue={cerealKeys}
            onChange={changeYparam}
          />
          <ChartBox cereals={cereals} xParam={xParam} yParam={yParam} />
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
