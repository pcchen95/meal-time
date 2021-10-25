import React from "react"
import PropTypes from "prop-types"
import { Div, Radiobox, Label } from "atomize"

const RadioField = ({ name, value, handleEvent, remind }) => {
  const titleLength = 5
  const marginLength = 0

  return (
    <Div d="flex" flexDir="column" m={{ y: "1rem" }}>
      <Div
        d="flex"
        flexDir={{ xs: "column", md: "row" }}
        align={{ xs: "flex-start", md: "center" }}
        w="100%"
        m={{ b: "0.5rem" }}
      >
        <Div
          textSize="subheader"
          w={`${titleLength}rem`}
          textAlign={{ xs: "left", md: "justify" }}
          style={{ textAlignLast: "justify" }}
        >
          {name}
        </Div>
        <Div
          w={{ xs: "100%", md: `calc(100% - ${titleLength}rem)` }}
          m={{ l: { xs: "0", md: "1rem" } }}
        >
          <Div d="flex" justify="space-around">
            <Label
              align="center"
              textWeight="600"
              m={{ b: "0.5rem", r: "2rem" }}
            >
              <Radiobox onChange={() => handleEvent(true)} checked={value} />是
            </Label>
            <Label
              align="center"
              textWeight="600"
              m={{ b: "0.5rem", r: "2rem" }}
            >
              <Radiobox onChange={() => handleEvent(false)} checked={!value} />
              否
            </Label>
          </Div>
        </Div>
      </Div>
      <Div
        textSize="14px"
        textColor="gray800"
        m={{ l: { xs: "0", md: `${marginLength}rem` } }}
      >
        {remind}
      </Div>
    </Div>
  )
}

RadioField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleEvent: PropTypes.func,
  remind: PropTypes.string,
}

export default RadioField
