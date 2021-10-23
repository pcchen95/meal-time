import React, { useState } from "react"
import { Div, Button } from "atomize"
import PropTypes from "prop-types"
export default function ProductsPageHeader({
  headerText,
  setPage,
  setSort,
  setOrder,
}) {
  const [active, setActive] = useState("new")
  return (
    <Div w="100%" d="flex" align="center" justify="space-between">
      {headerText}
      <Div d="flex" align="center">
        <Button
          h="2rem"
          p={{ x: "0.75rem" }}
          textSize="caption"
          textColor={active === "new" ? "white" : "info700"}
          hoverTextColor={active === "new" ? "white" : "info900"}
          bg={active === "new" ? "info700" : "white"}
          hoverBg={active === "new" ? "info900" : "info200"}
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          m={{ r: "0.5rem" }}
          onClick={() => {
            setPage(1)
            setSort("id")
            setOrder("DESC")
            setActive("new")
          }}
        >
          最新上架
        </Button>
        <Button
          h="2rem"
          p={{ x: "0.75rem" }}
          textSize="caption"
          textColor={active === "cheap" ? "white" : "info700"}
          hoverTextColor={active === "cheap" ? "white" : "info900"}
          bg={active === "cheap" ? "info700" : "white"}
          hoverBg={active === "cheap" ? "info900" : "info200"}
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          m={{ r: "0.5rem" }}
          onClick={() => {
            setPage(1)
            setSort("price")
            setOrder("ASC")
            setActive("cheap")
          }}
        >
          低價優先
        </Button>
        <Button
          h="2rem"
          p={{ x: "0.75rem" }}
          textSize="caption"
          textColor={active === "expiry" ? "white" : "info700"}
          hoverTextColor={active === "expiry" ? "white" : "info900"}
          bg={active === "expiry" ? "info700" : "white"}
          hoverBg={active === "expiry" ? "info900" : "info200"}
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          onClick={() => {
            setPage(1)
            setSort("expiryDate")
            setOrder("ASC")
            setActive("expiry")
          }}
        >
          即期優先
        </Button>
      </Div>
    </Div>
  )
}

ProductsPageHeader.propTypes = {
  headerText: PropTypes.func,
  setPage: PropTypes.func,
  setSort: PropTypes.func,
  setOrder: PropTypes.func,
}
