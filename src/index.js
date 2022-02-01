
import * as React from "react"
import * as ReactDOM from "react-dom"

import { FontSizes } from "@fluentui/theme"
import { Depths } from "@fluentui/theme"
import { Text } from "@fluentui/react/lib/Text"
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup"
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button"

const options = [
  { key: "vb", text: "Vlaams-Brabant" },
  { key: "wv", text: "West-Vlaanderen" },
  { key: "ov", text: "Oost-Vlaanderen" },
  { key: "a", text: "Antwerpen" },
  { key: "l", text: "Limburg" }
]

const getOptionTextForKey = (options, key) => {
  const option = options.find(o => o.key == key)
  return option == null ? null : option.text
}

const defaultBestProvinceKeyJSON = localStorage.getItem("bestProvince")
const defaultBestProvinceKey = defaultBestProvinceKeyJSON == null ? null : JSON.parse(defaultBestProvinceKeyJSON)

const App = () => {

  const [bestProvinceKey, setBestProvinceKey] = React.useState(defaultBestProvinceKey)

  const onResetClick = () => {
    setBestProvinceKey(null)
    localStorage.removeItem("bestProvince")
  }

  const onSaveClick = () => {
    localStorage.setItem("bestProvince", JSON.stringify(bestProvinceKey))
  }

  const onChange = (event, bestProvince) => {
    setBestProvinceKey(bestProvince.key)
  }

  return (
    <div>
      <Text
        style={{ fontSize: FontSizes.size42 }}>
        Beste provincie?
      </Text>
      <ChoiceGroup
        options={options}
        onChange={onChange}
        label="Pick one"
        required={true}
        selectedKey={bestProvinceKey}
      />
      {bestProvinceKey && (
        <div>
          <div style={{
            boxShadow: Depths.depth8,
            padding: "20px",
            userSelect: "none",
            width: "fit-content",
            marginTop: "20px",
            marginBottom: "20px",
            borderRadius: "4px"
          }}>
            <Text
              style={{ fontSize: FontSizes.size32 }}>
              {"🔥🔥" + getOptionTextForKey(options, bestProvinceKey) + "🔥🔥"}
            </Text>
          </div>
          <div style={{
            display: "flex",
            marginTop: "20px"
          }}>
            <DefaultButton
              style={{ marginRight: "10px" }}
              onClick={onResetClick}>
              Reset
            </DefaultButton>
            <PrimaryButton
              onClick={onSaveClick}>
              Save
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  )
}

window.initComponent = containerElement => {
  ReactDOM.render(<App />, containerElement)
}
