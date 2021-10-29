import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Div, Icon, Button } from "atomize";

const Picture = ({ url, id }) => {
  return (
    <Link to={`/product/${id}`}>
      <Div
        w="5rem"
        h="5rem"
        bgImg={url || "defaultImage.png"}
        bgSize="cover"
        bgPos="center"
      ></Div>
    </Link>
  );
};

Picture.propTypes = {
  url: PropTypes.string,
  id: PropTypes.number,
};

const NameAndPrice = ({ name, price, category }) => {
  return (
    <Div
      w={{ xs: "calc(100% - 7rem)", md: "10rem", lg: "15rem" }}
      m={{ l: "2rem" }}
      textSize="14px"
    >
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
      <Div textColor="gray800" m={{ t: "0.5rem" }} textSize="caption">
        分類：{category}
      </Div>
    </Div>
  );
};

NameAndPrice.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
};

const Status = ({ quantity, isAvailable, isExpired, expiryDate }) => {
  return (
    <Div
      d="flex"
      flexDir={{ xs: "row", sm: "column" }}
      align={{ xs: "flex-start" }}
      w={{ xs: "100%", sm: "50%", md: "auto" }}
      textColor="gray700"
      m={{ t: { xs: "1.5rem", sm: "0" }, l: { sm: "1rem" } }}
    >
      <Div
        textSize="tiny"
        m={{ y: "0.3rem" }}
        d="flex"
        flexDir="row"
        align="center"
        w={{ xs: "55%", sm: "auto" }}
      >
        {isAvailable && !isExpired && quantity > 0 && (
          <>
            <Icon name="Success" color="success700" size="14px" />
            <Div textColor="success700" m={{ x: "5px" }}>
              供應中
            </Div>
          </>
        )}
        {!isAvailable && !isExpired && quantity > 0 && (
          <>
            <Icon name="RemoveSolid" color="danger700" size="14px" />
            <Div textColor="danger700" m={{ x: "5px" }}>
              未供應
            </Div>
          </>
        )}
        {quantity === 0 && (
          <>
            <Icon name="CloseSolid" color="warning700" size="14px" />
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
          數量 {quantity}
        </Div>
        <Div textSize="tiny" m={{ y: "0.3rem" }}>
          效期 {expiryDate.slice(0, 10)}
        </Div>
      </Div>
    </Div>
  );
};

Status.propTypes = {
  quantity: PropTypes.number,
  expiryDate: PropTypes.string,
  isAvailable: PropTypes.bool,
  isExpired: PropTypes.bool,
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
  currentTime,
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
          w={{ xs: "100%", sm: "50%", md: "auto" }}
        >
          <Picture url={product.pictureUrl} id={product.id} />
          <NameAndPrice
            name={product.name}
            price={product.price}
            category={product.ProductCategory.name}
          />
        </Div>
        <Status
          quantity={product.quantity}
          isAvailable={product.isAvailable}
          isExpired={Date.parse(product.expiryDate).valueOf() < currentTime}
          expiryDate={product.expiryDate}
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
  currentTime: PropTypes.number,
};

export default VendorProductList;
