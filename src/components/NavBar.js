import React, { useState } from "react";
import { Div, Input, Icon, Image, Button } from "atomize";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { getProductCategories } from "../redux/reducers/productReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const InputWithRightIcon = ({ searchContent, setSarchContent, search }) => {
  return (
    <Div d="flex">
      <Image
        transform="translateY(-25%)"
        rounded="circle"
        h="5rem"
        w="5rem"
        p="1rem"
        src="logo.png"
      />
      <Input
        value={searchContent}
        onChange={(e) => {
          setSarchContent(e.target.value);
        }}
        onKeyPress={(e) => e.key === "Enter" && search()}
        placeholder="Search"
        suffix={
          <Icon
            name="Search"
            size="20px"
            cursor="pointer"
            onClick={() => search()}
            pos="absolute"
            top="25%"
            right="1rem"
            transform="translateY(-50%)"
          />
        }
      />
    </Div>
  );
};

InputWithRightIcon.propTypes = {
  searchContent: PropTypes.string,
  setSarchContent: PropTypes.func,
  search: PropTypes.func,
};

const CategoryButton = ({ categories }) => {
  return (
    <Div d="flex">
      {categories &&
        categories.map((category) => {
          return (
            <Link
              key={category.id}
              to={`/products/category/${category.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                h="2.5rem"
                p={{ x: "1.25rem" }}
                textSize="body"
                bg="white"
                hoverBg="warning300"
                rounded="circle"
                m={{ r: "1rem" }}
                fontFamily="code"
                textColor="info700"
                border="1px solid"
                borderColor="info500"
              >
                {category.name}
              </Button>
            </Link>
          );
        })}
    </Div>
  );
};

CategoryButton.propTypes = {
  categories: PropTypes.array,
};

const LikeButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
    >
      <Icon name="HeartSolid" size="20px" color="danger700" />
    </Button>
  );
};

const NotiButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
    >
      <Icon name="Notification" size="20px" color="black700" />
    </Button>
  );
};

const MenuButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
    >
      <Icon name="Menu" size="20px" color="black700" />
    </Button>
  );
};

const UserButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning600"
      rounded="circle"
      m={{ l: "1rem" }}
    >
      <Icon name="UserCircle" size="30px" color="black900" />
    </Button>
  );
};

const NavBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.products.productCategories);
  const history = useHistory();
  const [searchContent, setSarchContent] = useState("");
  const search = () => {
    if (!searchContent) {
      return;
    }
    history.push(`/products/search/${searchContent}`);
  };
  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);
  return (
    <Div
      m={{ t: "1.5rem", l: "1.5rem", r: "1.5rem", b: "3rem" }}
      p={{ t: "2rem", l: "2rem", r: "2rem" }}
      d="flex"
      justify="space-between"
      border={{ b: "1px solid" }}
      borderColor="info400"
      shadow="2"
    >
      <InputWithRightIcon
        searchContent={searchContent}
        setSarchContent={setSarchContent}
        search={search}
      ></InputWithRightIcon>
      <CategoryButton categories={categories}></CategoryButton>
      <Div d="flex">
        <LikeButton></LikeButton>
        <NotiButton></NotiButton>
        <MenuButton></MenuButton>
        <UserButton></UserButton>
      </Div>
    </Div>
  );
};

export default NavBar;
