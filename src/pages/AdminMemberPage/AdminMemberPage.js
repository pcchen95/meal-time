import React, { useState, useEffect } from "react";
import { Div } from "atomize";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllProfiles as getAllProfilesAPI,
  //updateUserAuth as updateUserAuthAPI,
} from "../../redux/reducers/adminReducer";
import { updateUserAuth } from "../../WebAPI/userAPI";
import { MemberFilterButton } from "../../Components/AdminSystem/FilterButton";
import MemberList from "../../Components/AdminSystem/MemberList";
import AdminOrderPage from "../AdminOrderPage/AdminOrderPage";
import AdminProductTypePage from "../AdminProductTypePage/AdminProductTypePage";
import AdminStoreTypePage from "../AdminStoreTypePage/AdminStoreTypePage";
import LoadingPage from "../LoadingPage/LoadingPage";

const AdminMemberPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.users.user);
  const members = useSelector((store) => store.admin.users);
  const isLoadingMember = useSelector((store) => store.admin.isLoading);
  console.log("members:", members);
  const [tab, setTab] = useState("Users");
  const [display, setDisplay] = useState("all");

  const DISPLAY_MAP = {
    all: (member) => member,
    suspended: (member) => member.role == "suspended",
  };

  useEffect(() => {
    if (user && (user === "non-login" || user.role !== "admin")) {
      history.push("/");
    }
    if (user && user.role === "admin") {
      dispatch(getAllProfilesAPI({ sort: "username", order: "ASC" }));
    }
  }, [user]);

  function handleRegularFilter() {
    setDisplay("all");
  }

  function handleSuspendedFilter() {
    setDisplay("suspended");
  }

  function handleChangeAuth(id) {
    console.log("btn");
    //dispatch(updateUserAuthAPI(id));
    updateUserAuth(id);
  }

  return (
    <Div>
      {isLoadingMember && <LoadingPage />}
      <Div m={{ l: "5rem", r: "5rem" }}>
        <Div
          textAlign="center"
          textWeight="700"
          textColor="black700"
          textSize="display1"
          border={{ b: "2px solid" }}
          borderColor="black700"
          p="1rem"
          m={{ b: "3rem" }}
        >
          管理員後台
        </Div>
        <Div align="center" d="flex">
          <Div
            rounded={{ tl: "md", tr: "md" }}
            textSize="subheader"
            textAlign="center"
            textWeight="700"
            textColor="info900"
            border={{ t: "2px solid", l: "2px solid", r: "2px solid" }}
            borderColor="info900"
            w="8rem"
            p="0.5rem"
            m={{ r: "1rem" }}
            cursor="pointer"
            hoverBg="info900"
            hoverTextColor="white"
            tab={tab}
            onClick={(e) => {
              setTab("Users");
              e.target.style.backgroundColor = "#14428a";
              e.target.style.color = "white";
            }}
          >
            管理使用者
          </Div>
          <Div
            rounded={{ tl: "md", tr: "md" }}
            textSize="subheader"
            textAlign="center"
            textWeight="700"
            textColor="info900"
            border={{ t: "2px solid", l: "2px solid", r: "2px solid" }}
            borderColor="info900"
            w="8rem"
            p="0.5rem"
            m={{ r: "1rem" }}
            cursor="pointer"
            hoverBg="info900"
            hoverTextColor="white"
            tab={tab}
            onClick={(e) => {
              setTab("Stores");
              e.target.style.backgroundColor = "#14428a";
              e.target.style.color = "white";
            }}
          >
            管理商家
          </Div>
          <Div
            rounded={{ tl: "md", tr: "md" }}
            textSize="subheader"
            textAlign="center"
            textWeight="700"
            textColor="info900"
            border={{ t: "2px solid", l: "2px solid", r: "2px solid" }}
            borderColor="info900"
            w="8rem"
            p="0.5rem"
            m={{ r: "1rem" }}
            cursor="pointer"
            hoverBg="info900"
            hoverTextColor="white"
            tab={tab}
            onClick={(e) => {
              setTab("Products");
              e.target.style.backgroundColor = "#14428a";
              e.target.style.color = "white";
            }}
          >
            管理產品
          </Div>
          <Div
            rounded={{ tl: "md", tr: "md" }}
            textSize="subheader"
            textAlign="center"
            textWeight="700"
            textColor="info900"
            border={{ t: "2px solid", l: "2px solid", r: "2px solid" }}
            borderColor="info900"
            w="8rem"
            p="0.5rem"
            m={{ r: "1rem" }}
            cursor="pointer"
            hoverBg="info900"
            hoverTextColor="white"
            tab={tab}
            onClick={(e) => {
              setTab("Orders");
              e.target.style.backgroundColor = "#14428a";
              e.target.style.color = "white";
            }}
          >
            管理訂單
          </Div>
        </Div>
        <Div border="2px solid" borderColor="info900" p="2rem">
          {/*errorMessage && <Div>{errorMessage}</Div>*/}

          {tab === "Users" && (
            <Div>
              {" "}
              <MemberFilterButton
                members={members}
                handleRegularFilter={handleRegularFilter}
                handleSuspendedFilter={handleSuspendedFilter}
              />
              {members &&
                members.rows
                  .filter(DISPLAY_MAP[display])
                  .map((member) => (
                    <MemberList
                      key={member.id}
                      member={member}
                      handleChangeAuth={handleChangeAuth}
                    />
                  ))}
            </Div>
          )}
          {tab === "Stores" && <AdminStoreTypePage />}
          {tab === "Products" && <AdminProductTypePage />}
          {tab === "Orders" && <AdminOrderPage />}
        </Div>
      </Div>
    </Div>
  );
};

export default AdminMemberPage;
