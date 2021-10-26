import React from "react"

import styled from "styled-components"
import { Div, Text } from "atomize"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const EllipsisText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export default function ProductCard({ product }) {
  let now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  const today = now.getTime()
  return (
    <Div
      key={product.id}
      textAlign="center"
      m={{ t: "2rem", l: { xs: "2rem", lg: "3.5rem" } }}
      p={{ x: 0 }}
      w="13rem"
      d="inline-block"
      borderColor="gray400"
      shadow="2"
      hoverShadow="4"
      border="1px solid"
      transition
      rounded="sm"
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <Div
          d="flex"
          justify="center"
          align="center"
          bgImg={product.pictureUrl}
          bgSize="cover"
          bgPos="center"
          opacity={
            (Date.parse(product.expiryDate) <= today && "0.6") ||
            (product.quantity === 0 && "0.6")
          }
          h="13rem"
          w="100%"
          rounded={{ tl: "sm", tr: "sm" }}
        >
          {(product.quantity === 0 && (
            <Div
              d="flex"
              justify="center"
              align="center"
              top="0"
              right="0"
              bg="black900"
              h="5rem"
              w="5rem"
              textSize="title"
              rounded="circle"
            >
              <Div textColor="white">完售</Div>
            </Div>
          )) ||
            (Date.parse(product.expiryDate) <= today && (
              <Div
                d="flex"
                justify="center"
                align="center"
                top="0"
                right="0"
                bg="black900"
                h="5rem"
                w="5rem"
                textSize="title"
                rounded="circle"
              >
                <Div textColor="white">已過期</Div>
              </Div>
            ))}
        </Div>
        <Text
          textSize="title"
          textWeight="400"
          textDecor="none"
          textColor="black"
          cursor="pointer"
          rounded="sm"
          m={{ t: "0.5rem", b: "0rem" }}
          p={{ x: "1rem" }}
        >
          <EllipsisText>{product.name}</EllipsisText>
        </Text>
        <Div d="flex" align="center" m={{ t: "0.5rem", b: "0rem" }} w="100%">
          <Div
            bgImg={product.Vendor.avatarUrl || "defaultImage.png"}
            bgSize="cover"
            bgPos="center"
            h="2rem"
            w="2rem"
            rounded="circle"
            m={{ l: "1.5rem", r: "1rem", y: "0rem" }}
          ></Div>
          <Text
            textSize="subheader"
            textColor="gray600"
            cursor="pointer"
            maxW="7.5rem"
            m={{ r: "1rem", y: "0rem" }}
          >
            <EllipsisText>{product.Vendor.vendorName}</EllipsisText>
          </Text>
        </Div>

        <Text
          textSize="subheader"
          m={{ b: "0.5rem", t: "0rem" }}
          textColor="info600"
        >
          NT$ {product.price}
        </Text>
      </Link>
    </Div>
  )
}
ProductCard.propTypes = {
  product: PropTypes.object,
}
