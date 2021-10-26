import React from 'react'
import PropTypes from 'prop-types'
import { Div, Col, Icon, Text } from 'atomize'
import styled from 'styled-components'
import ProductCount from '../CartSystem/ProductCount'

const DeleteItem = styled.div`
  position: absolute;
  right: 0rem;
  top: 5.3rem;
  cursor: pointer;
`

const CartItem = ({ userId, cartItem, cartData, handleDeleteClick }) => {
  return (
    <>
      {cartItem &&
        cartItem.map((item) => (
          <Div d={{ xs: 'block', lg: 'flex' }} pos="relative" key={item.id}>
            <Div m={{ l: '2rem' }}>
              <Col>
                <Div
                  bgImg={item && item.pictureUrl}
                  bgSize="cover"
                  bgPos="center"
                  w={{ xs: '10rem', lg: '12rem' }}
                  h={{ xs: '10rem', lg: '12rem' }}
                  rounded="lg"
                  m={{ t: '1rem' }}
                />
              </Col>
            </Div>
            <Div justify="space-between" m={{ x: '4rem', y: '2rem' }}>
              <Div>
                <Text>{item && item.name}</Text>
                <ProductCount item={item} cartData={cartData} userId={userId} />
                <Text>NT. {item.price}</Text>
              </Div>
            </Div>
            <DeleteItem
              onClick={() => {
                handleDeleteClick(item.id, userId)
              }}
              title="刪除"
            >
              <Icon name="Close" size="26px" hoverColor="danger700" />
            </DeleteItem>
          </Div>
        ))}
    </>
  )
}

CartItem.propTypes = {
  userId: PropTypes.number,
  cartItem: PropTypes.array,
  cartData: PropTypes.string,
  handleDeleteClick: PropTypes.func,
}

export default CartItem
