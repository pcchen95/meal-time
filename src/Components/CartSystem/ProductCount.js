import React, { useState } from "react"
import { Div, Button, Icon, Input } from "atomize"
import PropTypes from "prop-types"

const ProductCount = ({ item }) => {
  const [productCount, setProductCount] = useState(item.cartQuantity)

  const handleMinusClick = () => {
    if (productCount > 1) {
      setProductCount(Number(productCount) - 1)
    }
  }

  const handlePlusClick = () => {
    if (item && productCount < item.quantity) {
      setProductCount(Number(productCount) + 1)
    }
  }

  return (
    <Div d="flex" m={{ y: "1rem" }}>
      <Button
        h="2.5rem"
        w="2.5rem"
        bg="transparent"
        hoverBg="info300"
        rounded="sm"
        onClick={handleMinusClick}
      >
        <Icon name="Minus" size="20px" color="info700" />
      </Button>
      <Input
        type="number"
        name="quantity"
        rounded="sm"
        value={productCount}
        textAlign="center"
        onChange={(e) => {
          setProductCount(e.target.value)
        }}
        min={1}
        max={item && item.quantity}
        minW="6rem"
        title={`請輸入 0~${item && item.quantity} 內的數字`}
      />
      <Button
        h="2.5rem"
        w="2.5rem"
        bg="transparent"
        hoverBg="info300"
        rounded="sm"
        onClick={handlePlusClick}
      >
        <Icon name="Plus" size="20px" color="info700" />
      </Button>
    </Div>
  )
}

ProductCount.propTypes = { item: PropTypes.object }

export default ProductCount
