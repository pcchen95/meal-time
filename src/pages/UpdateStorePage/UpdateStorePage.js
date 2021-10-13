import React from "react";
import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  register,
  getVendor,
  getCategories,
  updateProfile,
  setToggleOpen,
} from "../../redux/reducers/vendorReducer";

import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Div } from "atomize";
import { remindText, inputRule } from "../../constants/inputText";
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

export default function UpdateStorePage() {
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
  const avatarInput = createRef();
  const bannerInput = createRef();
  const dispatch = useDispatch();
  const vendor = useSelector((store) => store.vendors.vendor);
  const isLoading = useSelector((store) => store.vendors.isLoading);
  const history = useHistory();

  const handleSubmit = () => {
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
      if (!vendor) {
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
      reader.readAsDataURL(file);
    } else {
      setBanner(null);
      dispatch(setErrorMessage(null));
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
      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
      dispatch(setErrorMessage(null));
    }
  };

  const handleInputAddress = (e) => {
    setAddress(e.target.value);
    debounceFn(e.target.value, setCompleteAddress);
  };

  useEffect(() => {
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
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (vendor) {
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
    }
  }, [vendor]);

  useEffect(() => {
    if (vendor) {
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
    <Div w="80%" m={{ y: "4rem", x: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Div w="100%">
          <BannerPreview
            banner={banner}
            handleBanner={handleBanner}
            bannerInput={bannerInput}
            handleDelete={() => {
              setBanner(null);
              setBannerInfo(null);
              if (vendor.bannerUrl) {
                setIsDeleteBanner(true);
                setIsEdited(true);
              }
              if (!vendor.bannerUrl) {
                setIsEdited(false);
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
                handleDelete={() => {
                  setAvatar(null);
                  setAvatarInfo(null);
                  if (vendor.avatarUrl) {
                    setIsDeleteAvatar(true);
                    setIsEdited(true);
                  }
                  if (!vendor.avatarUrl) {
                    setIsEdited(false);
                  }
                }}
              />
              <Div
                w={{ xs: "100%", md: "calc(100% - 14rem)" }}
                d="flex"
                flexDir="column"
                justify="center"
                m={{ l: { xs: "0", md: " 2rem" }, t: { xs: "2rem", md: " 0" } }}
              >
                <UploadAvatar
                  name="個人頭像"
                  avatarInput={avatarInput}
                  handleAvatar={handleAvatar}
                />
                <InputField
                  name="賣場名稱"
                  type="text"
                  value={vendorName}
                  handleEvent={(e) => setVendorName(e.target.value)}
                  required
                />
                <InputField
                  name="聯絡電話"
                  type="tel"
                  value={phone}
                  handleEvent={(e) => setPhone(e.target.value)}
                  remind={remindText.phone}
                  rule={inputRule.phone}
                  required
                />
                <InputField
                  name="賣場地址"
                  type="text"
                  value={address}
                  handleEvent={handleInputAddress}
                  remind={remindText.address}
                  rule={inputRule.address}
                  required
                />
                <InputField
                  name="賣場分類"
                  type="dropdown"
                  value={categoryId}
                  setCategoryId={setCategoryId}
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
                />
              </Div>
              <Div
                w={{ xs: "100%", md: "40%" }}
                h={{ xs: "18rem", md: "16rem" }}
                border={{ t: { xs: "4px solid", md: "" } }}
                borderColor="gray400"
                m={{ l: { xs: "0", md: "1rem" }, t: { xs: "2rem", md: "0" } }}
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
          />
          <ButtonGroup
            isDisabled={!isEdited || isLoading}
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
  );
}
