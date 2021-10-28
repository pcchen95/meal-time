import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Div, Icon, Button } from "atomize";

const Picture = ({ url }) => {
  return (
    <Div
      w="5rem"
      h="5rem"
      bgImg={url || "defaultImage.png"}
      bgSize="cover"
      bgPos="center"
    ></Div>
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

const Status = ({ isAvailable, quantity, category, isExpired, isSoldOut }) => {
  return (
    <Div
      d="flex"
      flexDir={{ xs: "row", sm: "column" }}
      align={{ xs: "flex-start" }}
      w={{ xs: "100%", sm: "50%", md: "auto" }}
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
        {isAvailable && !isSoldOut && !isExpired && (
          <>
            <Icon name="Success" color="success700" size="14px" />
            <Div textColor="success700" m={{ x: "5px" }}>
              供應中
            </Div>
          </>
        )}
        {!isAvailable && !isSoldOut && !isExpired && (
          <>
            <Icon name="RemoveSolid" color="danger700" size="14px" />
            <Div textColor="danger700" m={{ x: "5px" }}>
              未供應
            </Div>
          </>
        )}
        {isSoldOut && (
          <>
            <Icon name="AlertSolid" color="warning700" size="14px" />
            <Div textColor="warning700" m={{ x: "5px" }}>
              已售完
            </Div>
          </>
        )}
        {isExpired && (
          <>
            <Icon name="AlertSolid" color="warning700" size="14px" />
            <Div textColor="warning700" m={{ x: "5px" }}>
              已過期
            </Div>
          </>
        )}
      </Div>
      <Div>
        <Div textSize="tiny" m={{ y: "0.3rem" }}>
          分類 {category}
        </Div>
        <Div textSize="tiny" m={{ y: "0.3rem" }}>
          數量 {quantity}
        </Div>
      </Div>
    </Div>
  );
};

Status.propTypes = {
  isAvailable: PropTypes.bool,
  quantity: PropTypes.number,
  category: PropTypes.string,
  isExpired: PropTypes.bool,
  isSoldOut: PropTypes.bool,
};

const Buttons = ({ next, handleEvent, isDisabled }) => {
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
            hoverTextColor={!isDisabled && "info900"}
            bg="white"
            hoverBg={!isDisabled && "info200"}
            border="1px solid"
            borderColor="info700"
            hoverBorderColor={!isDisabled && "info900"}
            m={{ r: "0.5rem" }}
            w={{ xs: "100%", md: "5rem" }}
            disabled={isDisabled}
            cursor={isDisabled ? "not-allowed" : "pointer"}
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
        hoverTextColor={!isDisabled && "danger900"}
        bg="white"
        hoverBg={!isDisabled && "danger200"}
        border="1px solid"
        borderColor="danger700"
        hoverBorderColor={!isDisabled && "danger900"}
        m={{ r: "0.5rem" }}
        w={{ xs: "47%", md: "5rem" }}
        onClick={handleEvent}
        disabled={isDisabled}
        cursor={isDisabled ? "not-allowed" : "pointer"}
      >
        刪除
      </Button>
    </Div>
  );
};

Buttons.propTypes = {
  next: PropTypes.string,
  handleEvent: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export function VendorProductList({
  product,
  handleConfirmDelete,
  isDisabled,
  expiredProducts,
  soldOutProducts,
}) {
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
        <Div
          d="flex"
          align="center"
          justify="flex-start"
          w={{ sm: "50%", md: "auto" }}
        >
          <Picture url={product.pictureUrl} />
          <NameAndPrice name={product.name} price={product.price} />
        </Div>
        <Status
          isExpired={
            expiredProducts.map((item) => item.id).indexOf(product.id) >= 0
          }
          isSoldOut={
            soldOutProducts.map((item) => item.id).indexOf(product.id) >= 0
          }
          isAvailable={product.isAvailable}
          quantity={product.quantity}
          category={product.ProductCategory.name}
        />
      </Div>
      <Buttons
        next={`/product_edit/${product.id}`}
        handleEvent={() => handleConfirmDelete(product.id)}
        isDisabled={isDisabled}
      />
    </Div>
  );
}

VendorProductList.propTypes = {
  product: PropTypes.object,
  handleConfirmDelete: PropTypes.func,
  isDisabled: PropTypes.bool,
  expiredProducts: PropTypes.array,
  soldOutProducts: PropTypes.array,
};

export default VendorProductList;
