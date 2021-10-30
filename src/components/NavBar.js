import React, { useState } from "react";
import {
  Div,
  Input,
  Icon,
  Image,
  Button,
  SideDrawer,
  Text,
  Anchor,
} from "atomize";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { getProductCategories } from "../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CategoryDropdown from "./CategoryDropdown";
import { logout } from "../redux/reducers/userReducer";
import SyncSuccessNotification from "./Notifications/SyncSuccessNotification";
const InputWithRightIcon = ({ searchContent, setSarchContent, search }) => {
  return (
    <Div d="flex" align="center">
      <Anchor href="#">
        <Image rounded="circle" h="5rem" w="5rem" p="1rem" src="logo.png" />
      </Anchor>
      <Input
        value={searchContent}
        onChange={(e) => {
          setSarchContent(e.target.value);
        }}
        onKeyPress={(e) => e.key === "Enter" && search()}
        placeholder="尋找商品"
        suffix={
          <Icon
            name="Search"
            size="20px"
            cursor="pointer"
            onClick={() => search()}
            pos="absolute"
            top="25%"
            right="1rem"
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

const CartButton = () => {
  const history = useHistory();

  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="info200"
      rounded="circle"
      onClick={() => history.push("/cart")}
    >
      <Icon name="Bag" size="20px" color="black700" />
    </Button>
  );
};

const MessageButton = () => {
  const history = useHistory();

  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="info200"
      rounded="circle"
      onClick={() => history.push("/")} //訊息功能完成後加上訊息連結
    >
      <Icon name="Message" size="20px" color="black700" />
    </Button>
  );
};

const StoreButton = ({ handleEvent }) => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="info200"
      rounded="circle"
      onClick={handleEvent}
    >
      <Icon name="Store" size="20px" color="black700" />
    </Button>
  );
};
StoreButton.propTypes = {
  handleEvent: PropTypes.func,
};
const PageNavButton = ({ name, link, logoutEvent }) => {
  return (
    <Anchor
      href={link}
      textColor="black700"
      textSize="subheader"
      textWeight="600"
      p={{ x: "1rem" }}
      onClick={name === "登出" && logoutEvent}
    >
      <Text hoverTextColor="info800">{name}</Text>
    </Anchor>
  );
};
PageNavButton.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  logoutEvent: PropTypes.func,
};

const DrawerBtn = ({ name, handleEvent }) => {
  return (
    <Text
      p={{ t: "2rem" }}
      textSize="title"
      textColor="black700"
      hoverTextColor="info700"
      cursor="pointer"
      onClick={handleEvent}
    >
      {name}
    </Text>
  );
};
DrawerBtn.propTypes = {
  name: PropTypes.string,
  handleEvent: PropTypes.func,
};

const SizeSideDrawer = ({ isOpen, onClose, setShowSideDrawer, user }) => {
  const history = useHistory();
  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      w={{ xs: "100vw", sm: "16rem" }}
    >
      <Div m={{ b: "4rem" }} textAlign="center">
        {user && user === "non-login" && (
          <DrawerBtn
            name="請登入啟用功能"
            handleEvent={() => {
              setShowSideDrawer(false);
            }}
          />
        )}
        {user && user !== "non-login" && user.role === "member" && (
          <DrawerBtn
            name="申請成為賣家"
            handleEvent={() => {
              history.push("/update_store");
              setShowSideDrawer(false);
            }}
          />
        )}

        {user && user !== "non-login" && user.role !== "suspended" && (
          <DrawerBtn
            name="我的訂單"
            handleEvent={() => {
              history.push("/orders");
              setShowSideDrawer(false);
            }}
          />
        )}
        {user && user !== "non-login" && user.role === "vendor" && (
          <>
            <DrawerBtn
              name="更新賣場資料"
              handleEvent={() => {
                history.push("/update_store");
                setShowSideDrawer(false);
              }}
            />

            <DrawerBtn
              name="管理商品列表"
              handleEvent={() => {
                history.push("/product_manage");
                setShowSideDrawer(false);
              }}
            />

            <DrawerBtn
              name="我的賣場訂單"
              handleEvent={() => {
                history.push("/vendor_orders");
                setShowSideDrawer(false);
              }}
            />
          </>
        )}
        {user && user !== "non-login" && user.role === "admin" && (
          <>
            <DrawerBtn
              name="管理使用者"
              handleEvent={() => {
                history.push("/admin_member");
                setShowSideDrawer(false);
              }}
            />
            <DrawerBtn
              name="管理訂單"
              handleEvent={() => {
                history.push("/admin_order");
                setShowSideDrawer(false);
              }}
            />
            <DrawerBtn
              name="管理商品類別"
              handleEvent={() => {
                history.push("/admin_product_type");
                setShowSideDrawer(false);
              }}
            />
            <DrawerBtn
              name="管理賣場類別"
              handleEvent={() => {
                history.push("/admin_store_type");
                setShowSideDrawer(false);
              }}
            />
            <DrawerBtn
              name="管理員訊息"
              handleEvent={() => {
                history.push("/admin_message");
                setShowSideDrawer(false);
              }}
            />
            <DrawerBtn
              name="管理 FAQ"
              handleEvent={() => {
                history.push("/admin_FAQ");
                setShowSideDrawer(false);
              }}
            />
          </>
        )}

        <DrawerBtn name="返回" handleEvent={() => setShowSideDrawer(false)} />
      </Div>
    </SideDrawer>
  );
};

SizeSideDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setShowSideDrawer: PropTypes.func,
  user: PropTypes.object,
};

const Drawer = ({ showSideDrawer, setShowSideDrawer, user }) => {
  return (
    <>
      <Button
        h="2.5rem"
        w="2.5rem"
        bg="white"
        hoverBg="info200"
        rounded="circle"
        onClick={() => setShowSideDrawer(true)}
      >
        <Icon name="Menu" size="20px" color="black700" />
      </Button>
      <SizeSideDrawer
        isOpen={showSideDrawer}
        setShowSideDrawer={setShowSideDrawer}
        onClose={() => setShowSideDrawer(false)}
        user={user}
      />
    </>
  );
};

Drawer.propTypes = {
  showSideDrawer: PropTypes.bool,
  setShowSideDrawer: PropTypes.func,
  user: PropTypes.object,
};
const UserButton = () => {
  return (
    <Button h="2.5rem" w="2.5rem" bg="white" rounded="circle" hoverBg="info200">
      <Icon name="UserCircle" size="30px" color="black900" />
    </Button>
  );
};

const UserBlock = ({ setShowUserBtn, showUserBtn, user, logoutEvent }) => {
  return (
    <Div
      d="flex"
      justify={{ xs: "center" }}
      align="center"
      rounded="circle"
      hoverBg="info200"
      transition
      onClick={() => setShowUserBtn(!showUserBtn)}
    >
      <UserButton></UserButton>
      {user && user === "non-login" && showUserBtn && (
        <PageNavButton name="登入" link="#/signin" />
      )}
      {user && user === "non-login" && showUserBtn && (
        <PageNavButton name="註冊" link="#/signup" />
      )}
      {user &&
        user !== "non-login" &&
        user.role !== "suspended" &&
        showUserBtn && (
          <PageNavButton name="編輯會員資料" link="#/member_edit" />
        )}
      {user &&
        user !== "non-login" &&
        user.role === "suspended" &&
        showUserBtn && <PageNavButton name="你已被停權" />}
      {user && user !== "non-login" && showUserBtn && (
        <PageNavButton name="登出" logoutEvent={logoutEvent} />
      )}
    </Div>
  );
};

UserBlock.propTypes = {
  setShowUserBtn: PropTypes.func,
  showUserBtn: PropTypes.bool,
  user: PropTypes.object,
  logoutEvent: PropTypes.func,
};

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchContent, setSarchContent] = useState("");
  const [showUserBtn, setShowUserBtn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const user = useSelector((state) => state.users.user);
  const search = () => {
    if (!searchContent) {
      return;
    }
    history.push(`/products/search/${searchContent}`);
    setSarchContent("");
  };
  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const logoutEvent = () => {
    dispatch(logout());
    setShowSuccess(true);
    history.push(`/`);
  };

  const toMyStore = () => {
    history.push(`/store/${user.vendorId}`);
  };
  return (
    <Div
      m={{ t: "1.5rem", l: "1.5rem", r: "1.5rem", b: "3rem" }}
      p={{ y: "0.5rem", x: "2rem" }}
      d={{ md: "flex" }}
      align="center"
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
      <Div
        d="flex"
        flexDir={{ xs: "column", md: "row" }}
        justify={{ xs: "center" }}
        align="center"
      >
        <PageNavButton name="商品列表" link="#/products" />
        <PageNavButton name="搜尋賣家" link="#/map" />
        <CategoryDropdown />
      </Div>
      <Div
        d="flex"
        flexDir={
          showUserBtn ? { xs: "column", lg: "row" } : { xs: "row", lg: "row" }
        }
        justify={{ xs: "center" }}
        align="center"
      >
        <Div d="flex" justify={{ xs: "center" }} align="center">
          {user && user !== "non-login" && user.role !== "suspended" && (
            <>
              <CartButton></CartButton>
              <MessageButton></MessageButton>
              <Drawer
                showSideDrawer={showSideDrawer}
                setShowSideDrawer={setShowSideDrawer}
                user={user}
              />
            </>
          )}
          {user && user !== "non-login" && user.role === "vendor" && (
            <StoreButton handleEvent={toMyStore}></StoreButton>
          )}
        </Div>
        <UserBlock
          showUserBtn={showUserBtn}
          setShowUserBtn={setShowUserBtn}
          user={user}
          logoutEvent={logoutEvent}
        />
      </Div>
      <SyncSuccessNotification
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        successMessage={`已登出`}
      />
    </Div>
  );
};

export default NavBar;
