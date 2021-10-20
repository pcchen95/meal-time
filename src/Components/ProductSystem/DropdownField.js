import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useState } from "react"
import { Div, Text, Dropdown } from "atomize"
import { useSelector } from "react-redux"

///from pcc

const lists = ({ categories, categoryId, setCategoryId, setShowDropdown }) => {
  return (
    <Div p={{ x: "1rem", y: "0.5rem" }}>
      {categories &&
        categories
          .filter((category) => category.id !== categoryId)
          .map((category) => {
            return (
              <Text
                key={category.id}
                d="block"
                p={{ y: "0.25rem" }}
                hoverTextColor="info700"
                value={category.id}
                onClick={(e) => {
                  setCategoryId(Number(e.target.getAttribute("value")))
                  setShowDropdown(false)
                }}
                cursor="pointer"
              >
                {category.name}
              </Text>
            )
          })}
    </Div>
  )
}

lists.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func,
  categories: PropTypes.object,
  setShowDropdown: PropTypes.func,
}

export function CategoryDropdown({ categoryId, setCategoryId, remind, name }) {
  let titleLength = 5
  let marginLength = 0

  const [showDropdown, setShowDropdown] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const categories = useSelector((store) => store.products.productCategories)

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === categoryId)
          return setCategoryName(categories[i].name)
      }
    }
  }, [categoryId, categories])

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
          <Dropdown
            isOpen={showDropdown}
            onClick={handleToggleDropdown}
            textColor="gray600"
            menu={lists({
              categories,
              categoryId,
              setCategoryId,
              setShowDropdown,
            })}
          >
            {categoryName}
          </Dropdown>
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

CategoryDropdown.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func,
  remind: PropTypes.string,
  name: PropTypes.string,
}

export default CategoryDropdown
