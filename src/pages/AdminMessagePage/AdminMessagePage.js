import React, { useState, useEffect } from "react";
import { Div } from "atomize";
//import { useSelector, useDispatch } from "react-redux";
//import { getAllProfiles as getAllProfilesAPI } from "../../redux/reducers/adminReducer";
import { login } from "../../WebAPI/userAPI";
import { updateUserAuth, getAllProfiles } from "../../WebAPI/userAPI";

//import { getAllProfiles, updateUserAuth } from "../../WebAPI/userAPI";
import { MemberFilterButton } from "../../Components/AdminSystem/FilterButton";
import MemberList from "../../Components/AdminSystem/MemberList";

const AdminMemberPage = () => {
  /*
  const dispatch = useDispatch();
  const users = useSelector((store) => store.admin.users);
  let usersData = Object.values(users)[1];
  dispatch(getAllProfilesAPI({ page: 1 }));
  const state = useSelector(selectAllUsers);
  console.log(state.rows);
  */
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState("all");
  const [errorMessage, setErrorMessage] = useState();

  const DISPLAY_MAP = {
    all: (user) => user,
    suspended: (user) => user.role == "suspended",
  };

  /*
  useEffect(() => {
    dispatch(getAllProfilesAPI(1)).then((res) => {
      console.log(res);
      setUsers(res.data);
    });
  }, []);
    useEffect(() => {
      dispatch(getAllProfilesAPI(1));
      setUsers(users);
    });
    */
  useEffect(() => {
    login("admin", "admin").then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      getAllProfiles(1).then((res) => {
        setUsers(res.data.rows);
      });
    });
  }, []);

  function handleRegularFilter() {
    setDisplay("all");
  }

  function handleSuspendedFilter() {
    setDisplay("suspended");
  }

  function handleChangeAuth(id) {
    console.log("btn");
    updateUserAuth(id);
  }

  return (
    <Div>
      <Div m={{ l: "5rem", r: "5rem" }}>
        {errorMessage && <Div>{errorMessage}</Div>}
        <MemberFilterButton
          user={users}
          handleRegularFilter={handleRegularFilter}
          handleSuspendedFilter={handleSuspendedFilter}
        />
        {users.filter(DISPLAY_MAP[display]).map((user) => (
          <MemberList
            key={user.id}
            user={user}
            handleChangeAuth={handleChangeAuth}
          />
        ))}
      </Div>
    </Div>
  );
};

export default AdminMemberPage;
