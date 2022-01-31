
import * as React from "react"
import * as ReactDOM from "react-dom"

import { Depths } from '@fluentui/theme';
import { Text } from '@fluentui/react/lib/Text';
import { FontSizes } from '@fluentui/theme';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

const options = [
  { key: 'laurens', text: 'Laurens' },
  { key: 'ruben', text: 'Ruben' },
]

const getOptionTextForKey = (options, key) => {
  const option = options.find(o => o.key == key)

  if (option == null)
    return

  return option.text
}


const App = () => {

  const [theBestKey, setTheBestKey] = React.useState(null)

  const onChange = (event, theBest) => {
    setTheBestKey(theBest.key)
  }

  return (
    <div>
      <Text
        style={{ fontSize: FontSizes.size42 }}>
        Wie is de beste?
      </Text>
      <ChoiceGroup
        options={options}
        onChange={onChange}
        label="Pick one"
        required={true}
        selectedKey={theBestKey}
      />
      {theBestKey && (
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
              {"🔥🔥" + getOptionTextForKey(options, theBestKey) + "🔥🔥"}
            </Text>
          </div>

          <PrimaryButton
            styles={{ marginTop: "20px" }}
            onClick={() => setTheBestKey(null)}>
            Reset
          </PrimaryButton>
        </div>
      )
      }

    </div>
  )

}

window.initComponent = containerElement => {
  ReactDOM.render(<App />, document.getElementById("root"))
}
