import React, { useState } from "react";
import { Div, Input, Icon, Image, Button, SideDrawer, Text } from "atomize";
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
        src="https://i.pinimg.com/564x/82/ba/7d/82ba7db3760b88da021a340ee9eb861e.jpg"
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
    <Div d="flex" flexWrap={{ xs: "wrap" }} justify={{ xs: "space-around" }}>
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
                m={{ r: { xs: "0.25rem", md: "1rem" }, b: { xs: "0.25rem" } }}
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
  const history = useHistory();

  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
      onClick={() => history.push("/cart")}
    >
      <Icon name="HeartSolid" size="20px" color="danger700" />
    </Button>
  );
};

const NotiButton = () => {
  const history = useHistory();

  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
      onClick={() => history.push("/entrance")}
    >
      <Icon name="Notification" size="20px" color="black700" />
    </Button>
  );
};

const SizeSideDrawer = ({ isOpen, onClose }) => {
  const history = useHistory();

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      w={{ xs: "100vw", sm: "16rem" }}
    >
      <Div m={{ b: "4rem" }} textAlign="center">
        <Text
          p={{ t: "2rem" }}
          textSize="title"
          textColor="black700"
          hoverTextColor="info700"
          cursor="pointer"
          onClick={() => history.push("/member_edit")}
        >
          編輯個人資料
        </Text>
        <Text
          p={{ t: "2rem" }}
          textSize="title"
          textColor="black700"
          hoverTextColor="info700"
          cursor="pointer"
        >
          申請成為賣家
        </Text>{" "}
        <Text
          p={{ t: "2rem" }}
          textSize="title"
          textColor="black700"
          hoverTextColor="info700"
          cursor="pointer"
          onClick={() => history.push("/update_store")}
        >
          管理商家頁面
        </Text>{" "}
        <Text
          p={{ t: "2rem" }}
          textSize="title"
          textColor="black700"
          hoverTextColor="info700"
          cursor="pointer"
        >
          管理商品列表
        </Text>
        <Text
          p={{ t: "2rem" }}
          textSize="title"
          textColor="black700"
          hoverTextColor="info700"
          cursor="pointer"
          onClick={() => history.push("/orders")}
        >
          訂單詳情
        </Text>
      </Div>
    </SideDrawer>
  );
};

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    };
  }
  render() {
    const { showSideDrawer } = this.state;
    return (
      <>
        <Button
          h="2.5rem"
          w="2.5rem"
          bg="white"
          hoverBg="warning400"
          rounded="circle"
          onClick={() =>
            this.setState({
              showSideDrawer: true,
            })
          }
        >
          <Icon name="Menu" size="20px" color="black700" />
        </Button>
        <SizeSideDrawer
          isOpen={showSideDrawer}
          onClose={() => this.setState({ showSideDrawer: false })}
        />
      </>
    );
  }
}

SizeSideDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

const UserButton = () => {
  const history = useHistory();

  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning600"
      rounded="circle"
      m={{ l: "1rem" }}
      onClick={() => history.push("/entrance")}
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
      d={{ md: "flex" }}
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
      <Div d="flex" justify={{ xs: "center" }} m={{ t: { xs: "1rem" } }}>
        <LikeButton></LikeButton>
        <NotiButton></NotiButton>
        <Drawer />
        <UserButton></UserButton>
      </Div>
    </Div>
  );
};

export default NavBar;
