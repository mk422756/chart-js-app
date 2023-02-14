import { ChangeEventHandler } from "react"
import { cerealKeys } from "src/constants/cereals"
import { capitalizeFirstLetter } from "src/util/util"

interface Props {
  value: string
  label: string
  onChange: ChangeEventHandler<HTMLSelectElement>
}
export default function ParamSelectBox(props: Props) {
  return (
    <div>
      <label>
        {props.label}:
        <select value={props.value} onChange={props.onChange}>
          {cerealKeys.map((cereal) => {
            return (
              <option key={cereal} value={cereal}>
                {capitalizeFirstLetter(cereal)}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}
