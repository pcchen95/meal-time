import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  register,
  getVendor,
  cleanVendor,
  getCategories,
  updateProfile,
  setToggleOpen,
} from "../../redux/reducers/vendorReducer";

import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Div, Text } from "atomize";
import { remindText, inputRule } from "../../constants/inputText";
import googleMapToken from "../../constants/googleMapToken";
import { useJsApiLoader } from "@react-google-maps/api";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";
import ButtonGroup from "../../Components/VendorSystem/ButtonGroup";
import BannerPreview from "../../Components/VendorSystem/BannerPreview";
import AvatarPreview from "../../Components/VendorSystem/AvatarPreview";
import InputField from "../../Components/VendorSystem/InputField";
import TextAreaField from "../../Components/VendorSystem/TextAreaField";
import OpeningHour from "../../Components/VendorSystem/OpeningHour";
import UploadAvatar from "../../Components/VendorSystem/UploadAvatar";
import Map from "../../Components/VendorSystem/Map";
import LoadingPage from "../LoadingPage/LoadingPage";

const debounce = (fn) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, 3000);
  };
};

const debounceFn = debounce((value, setCompleteAddress) =>
  setCompleteAddress(value)
);

const daysCH = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
const daysENG = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function UpdateStorePage() {
  const [vendorName, setVendorName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [latlng, setLatLng] = useState(null);
  const [completeAddress, setCompleteAddress] = useState("");
  const [openingHour, setOpeningHour] = useState(() => {
    const time = {};
    daysENG.forEach((day) => (time[day] = { isOpen: 0, start: "", end: "" }));
    return time;
  });
  const [categoryId, setCategoryId] = useState(1);
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [avatarInfo, setAvatarInfo] = useState(null);
  const [bannerInfo, setBannerInfo] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false);
  const [isDeleteBanner, setIsDeleteBanner] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const avatarInput = useRef();
  const bannerInput = useRef();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);
  const vendor = useSelector((store) => store.vendors.vendor);
  const isLoading = useSelector((store) => store.vendors.isLoading);
  const history = useHistory();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapToken,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vendorName || !phone || !address || !openingHour) {
      dispatch(setErrorMessage("請填入所有必填欄位"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    const keys = Object.keys(openingHour);
    for (let i = 0; i < keys.length; i++) {
      const { isOpen, start, end } = openingHour[keys[i]];
      if (isOpen && (!start || !end)) {
        dispatch(setErrorMessage("請選擇營業日之營業時間"));
        dispatch(setShowWarningNotification(true));
        return;
      }
    }

    const openingHourJson = JSON.stringify(openingHour);
    const latlngJson = JSON.stringify(latlng);
    if (
      (!avatarInfo || avatarInfo.size <= 1048576) &&
      (!bannerInfo || bannerInfo.size < 1048576)
    ) {
      dispatch(setErrorMessage(null));
      if (vendor === "not-vendor") {
        return dispatch(
          register({
            avatar: avatarInfo,
            banner: bannerInfo,
            vendorName,
            address,
            latlng: latlngJson,
            phone,
            openingHour: openingHourJson,
            categoryId,
            description,
          })
        );
      }
      dispatch(
        updateProfile({
          avatar: avatarInfo,
          banner: bannerInfo,
          vendorName,
          address,
          latlng: latlngJson,
          phone,
          openingHour: openingHourJson,
          categoryId,
          description,
          isDeleteAvatar,
          isDeleteBanner,
        })
      );
    }
  };

  const handleBanner = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        dispatch(setErrorMessage("檔案過大"));
        dispatch(setShowWarningNotification(true));
        return;
      }
      setBannerInfo(file);
      reader.onload = function (e) {
        setBanner(e.target.result);
        dispatch(setErrorMessage(null));
        setIsEdited(true);
      };
      reader.onloadend = function () {
        bannerInput.current.value = "";
      };
      reader.readAsDataURL(file);
    } else {
      setBanner(null);
      dispatch(setErrorMessage(null));
      setIsEdited(false);
      if (vendor.bannerUrl) setIsEdited(true);
    }
  };

  const handleAvatar = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        dispatch(setErrorMessage("檔案過大"));
        dispatch(setShowWarningNotification(true));
        return;
      }
      setAvatarInfo(file);
      reader.onload = function (e) {
        setAvatar(e.target.result);
        dispatch(setErrorMessage(null));
        setIsEdited(true);
      };
      reader.onloadend = function () {
        avatarInput.current.value = "";
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
      dispatch(setErrorMessage(null));
      setIsEdited(false);
      if (vendor.avatarUrl) setIsEdited(true);
    }
  };

  const handleInputAddress = (e) => {
    setAddress(e.target.value);
    debounceFn(e.target.value, setCompleteAddress);
  };

  useEffect(() => {
    if (user === "non-login") {
      return history.push("/");
    }
    dispatch(getVendor());
    dispatch(getCategories());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return () => {
      setAvatar(null);
      setBanner(null);
      setVendorName("");
      setAddress("");
      setLatLng(null);
      setPhone("");
      setOpeningHour(() => {
        const time = {};
        daysENG.forEach(
          (day) => (time[day] = { isOpen: 0, start: "", end: "" })
        );
        return time;
      });
      setDescription("");
      setCategoryId(1);
      dispatch(setErrorMessage(null));
      dispatch(cleanVendor());
    };
  }, []);

  useEffect(() => {
    if (vendor && vendor !== "not-vendor" && user) {
      setVendorName(vendor.vendorName);
      setAddress(vendor.address);
      setLatLng({
        lat: vendor.position.coordinates[0],
        lng: vendor.position.coordinates[1],
      });
      setPhone(vendor.phone);
      setOpeningHour(JSON.parse(vendor.openingHour));
      setAvatar(vendor.avatarUrl);
      setBanner(vendor.bannerUrl);
      setDescription(vendor.description);
      setCategoryId(vendor.categoryId);
      if (vendor.isSuspended || !vendor.isOpen || user.role === "suspended") {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
    if (vendor && vendor === "not-vendor" && user) setIsEdited(true);
  }, [vendor, user]);

  useEffect(() => {
    if (vendor && vendor !== "not-vendor") {
      vendorName !== vendor.vendorName ||
      address !== vendor.address ||
      latlng.lat !== vendor.position.coordinates[0] ||
      latlng.lng !== vendor.position.coordinates[1] ||
      phone !== vendor.phone ||
      JSON.stringify(openingHour) !== vendor.openingHour ||
      categoryId !== vendor.categoryId ||
      description !== vendor.description
        ? setIsEdited(true)
        : setIsEdited(false);
    }
  }, [
    vendor,
    vendorName,
    address,
    latlng,
    openingHour,
    phone,
    description,
    categoryId,
  ]);

  return (
    <>
      {isLoading && <LoadingPage />}
      {vendor && user && isLoaded && (
        <Div w="80%" m={{ y: "4rem", x: "auto" }}>
          {(vendor.isSuspended || user.role === "suspended") && (
            <Div tag="h4" textColor="danger800" w="100%" textAlign="center">
              您已被停權！
            </Div>
          )}
          <Text
            textSize="heading"
            w="100%"
            textAlign="center"
            textColor="info900"
          >
            {vendor === "not-vendor" ? "註冊為賣家" : "更新賣家資料"}
          </Text>
          <form onSubmit={handleSubmit}>
            <Div w="100%">
              <BannerPreview
                banner={banner}
                handleBanner={handleBanner}
                bannerInput={bannerInput}
                isDisabled={isDisabled}
                handleDelete={() => {
                  setBanner(null);
                  setBannerInfo(null);
                  if (vendor !== "not-vendor") {
                    if (vendor.bannerUrl) {
                      setIsDeleteBanner(true);
                      setIsEdited(true);
                    }
                    if (!vendor.bannerUrl) {
                      setIsEdited(false);
                    }
                  }
                }}
              />
              <Div w="100%">
                <Div
                  p="1rem"
                  d={{ xs: "", md: "flex" }}
                  align="center"
                  w="100%"
                  h={{ xs: "auto", md: "20rem" }}
                >
                  <AvatarPreview
                    image={avatar}
                    isDisabled={isDisabled}
                    handleDelete={() => {
                      setAvatar(null);
                      setAvatarInfo(null);
                      if (vendor !== "not-vendor") {
                        if (vendor.avatarUrl) {
                          setIsDeleteAvatar(true);
                          setIsEdited(true);
                        }
                        if (!vendor.avatarUrl) {
                          setIsEdited(false);
                        }
                      }
                    }}
                  />
                  <Div
                    w={{ xs: "100%", md: "calc(100% - 14rem)" }}
                    d="flex"
                    flexDir="column"
                    justify="center"
                    m={{
                      l: { xs: "0", md: " 2rem" },
                      t: { xs: "2rem", md: " 0" },
                    }}
                  >
                    <UploadAvatar
                      name="賣場頭像"
                      avatarInput={avatarInput}
                      handleAvatar={handleAvatar}
                      isDisabled={isDisabled}
                    />
                    <InputField
                      name="賣場名稱"
                      type="text"
                      value={vendorName}
                      handleEvent={(e) => setVendorName(e.target.value)}
                      required
                      isDisabled={isDisabled}
                    />
                    <InputField
                      name="聯絡電話"
                      type="tel"
                      value={phone}
                      handleEvent={(e) => setPhone(e.target.value)}
                      remind={remindText.phone}
                      rule={inputRule.phone}
                      required
                      isDisabled={isDisabled}
                    />
                    <InputField
                      name="賣場地址"
                      type="text"
                      value={address}
                      handleEvent={handleInputAddress}
                      remind={remindText.address}
                      rule={inputRule.address}
                      required
                      isDisabled={isDisabled}
                    />
                    <InputField
                      name="賣場分類"
                      type="dropdown"
                      value={categoryId}
                      setCategoryId={setCategoryId}
                      isDisabled={isDisabled}
                    />
                  </Div>
                </Div>
                <Div
                  d={{ xs: "", md: "flex" }}
                  align="flex-end"
                  h={{ xs: "auto", md: "18rem" }}
                  border={{ b: "4px solid" }}
                  borderColor="gray400"
                  p="1rem 0"
                >
                  <Div w={{ xs: "100%", md: "60%" }} p={{ x: "1rem" }} h="100%">
                    賣場介紹
                    <TextAreaField
                      name="向顧客介紹你的賣場吧"
                      value={description}
                      handleEvent={(e) => setDescription(e.target.value)}
                      isDisabled={isDisabled}
                    />
                  </Div>
                  <Div
                    w={{ xs: "100%", md: "40%" }}
                    h={{ xs: "18rem", md: "16rem" }}
                    border={{ t: { xs: "4px solid", md: "" } }}
                    borderColor="gray400"
                    m={{
                      l: { xs: "0", md: "1rem" },
                      t: { xs: "2rem", md: "0" },
                    }}
                    p={{ y: { xs: "2rem", md: "0" } }}
                    d="flex"
                    align="center"
                  >
                    <Map
                      completeAddress={completeAddress}
                      latlng={latlng}
                      setLatLng={setLatLng}
                    />
                  </Div>
                </Div>
              </Div>
            </Div>
            <Div>
              <OpeningHour
                daysCH={daysCH}
                values={openingHour}
                setValues={setOpeningHour}
                isDisabled={isDisabled}
              />
              <ButtonGroup
                isInputDisabled={!isEdited}
                isStoreOpen={vendor !== "not-vendor" ? vendor.isOpen : true}
                isSuspended={vendor.isSuspended || user.role === "suspended"}
                handleSubmit={handleSubmit}
                handleBack={() => history.goBack()}
                vendor={vendor}
                handleToggleOpen={() => dispatch(setToggleOpen())}
              />
            </Div>
            <SuccessNotification />
            <WarningNotification />
          </form>
        </Div>
      )}
    </>
  );
}
