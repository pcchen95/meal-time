import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Div, Icon, Button } from "atomize";

const Picture = ({ url }) => {
  return (
    <Div w="5rem" h="5rem" bgImg={url} bgSize="cover" bgPos="center"></Div>
  );
};

Picture.propTypes = {
  url: PropTypes.string,
};

const NameAndPrice = ({ name, price }) => {
  return (
    <Div w="10rem" m={{ l: "2rem" }} textSize="14px">
      <Div
        textColor="black800"
        w="100%"
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {name}
      </Div>
      <Div textColor="black800" m={{ t: "0.5rem" }}>
        NT$ {price}
      </Div>
    </Div>
  );
};

NameAndPrice.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
};

const Status = ({ isAvailable, quantity }) => {
  return (
    <Div
      d="flex"
      flexDir={{ xs: "row", sm: "column" }}
      align={{ xs: "flex-start" }}
      w={{ xs: "100%", sm: "60px" }}
      textColor="gray700"
      m={{ t: { xs: "1.5rem", sm: "0" } }}
    >
      <Div
        textSize="tiny"
        m={{ y: "0.3rem" }}
        d="flex"
        flexDir="row"
        align="center"
        w={{ xs: "55%", sm: "auto" }}
      >
        {isAvailable && (
          <>
            <Icon name="Success" color="success700" size="14px" />
            <Div textColor="success700" m={{ l: "5px" }}>
              供應中
            </Div>
          </>
        )}
        {!isAvailable && (
          <>
            <Icon name="RemoveSolid" color="danger700" size="14px" />
            <Div textColor="danger700" m={{ l: "5px" }}>
              未供應
            </Div>
          </>
        )}
      </Div>
      <Div>
        <Div textSize="tiny" m={{ y: "0.3rem" }}>
          商品數量 {quantity}
        </Div>
        <Div textSize="tiny" m={{ y: "0.3rem" }}>
          已賣出{" "}
        </Div>
      </Div>
    </Div>
  );
};

Status.propTypes = {
  isAvailable: PropTypes.bool,
  quantity: PropTypes.number,
};

const Buttons = ({ next, handleEvent }) => {
  return (
    <Div
      m={{
        l: { xs: "0", md: "1rem" },
        t: { xs: "1rem", sm: "1.5rem", md: "0" },
      }}
      d="flex"
      justify="space-between"
      w={{ xs: "100%", md: "15rem" }}
    >
      <Div w={{ xs: "47%", md: "6rem" }}>
        <Link to={next} style={{ textDecoration: "none", width: "100%" }}>
          <Button
            h="2rem"
            p={{ x: "0.75rem" }}
            textSize="caption"
            textColor="info700"
            hoverTextColor="info900"
            bg="white"
            hoverBg="info200"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info900"
            m={{ r: "0.5rem" }}
            w={{ xs: "100%", md: "5rem" }}
          >
            編輯
          </Button>
        </Link>
      </Div>
      <Button
        h="2rem"
        p={{ x: "0.75rem" }}
        textSize="caption"
        textColor="danger700"
        hoverTextColor="danger900"
        bg="white"
        hoverBg="danger200"
        border="1px solid"
        borderColor="danger700"
        hoverBorderColor="danger900"
        m={{ r: "0.5rem" }}
        w={{ xs: "47%", md: "5rem" }}
        onClick={handleEvent}
      >
        刪除
      </Button>
    </Div>
  );
};

Buttons.propTypes = {
  next: PropTypes.string,
  handleEvent: PropTypes.func,
};

export function VendorProductList({ product, handleDelete }) {
  return (
    <Div
      key={product.id}
      w="100%"
      border={{ b: "1px dotted" }}
      borderColor="gray700"
      d="flex"
      flexDir={{ xs: "column", md: "row" }}
      align={{ xs: "flex-start", sm: "center" }}
      justify="space-between"
      p={{ y: "1rem" }}
    >
      <Div
        d="flex"
        flexDir={{ xs: "column", sm: "row" }}
        align={{ xs: "flex-start", sm: "center" }}
        justify="flex-start"
        w="100%"
      >
        <Div d="flex" align="center" justify="flex-start">
          <Picture url={product.pictureUrl} />
          <NameAndPrice name={product.name} price={product.price} />
        </Div>
        <Status isAvailable={product.isAvailable} quantity={product.quantity} />
      </Div>
      <Buttons
        next={`/product_edit/${product.id}`}
        handleEvent={() => handleDelete(product.id)}
      />
    </Div>
  );
}

VendorProductList.propTypes = {
  product: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default VendorProductList;
