import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Div } from "atomize";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import {
  postProduct,
  getProductCategories,
  getProduct,
  cleanProduct,
  patchProduct,
} from "../../redux/reducers/productReducer";
import { getVendor } from "../../redux/reducers/vendorReducer";
import UploadButton from "../../Components/ProductSystem/UploadButton";
import PreviewAvatar from "../../Components/ProductSystem/PreviewAvatar";
import InputField from "../../Components/ProductSystem/InputField";
import CategoryDropdown from "../../Components/ProductSystem/DropdownField";
import RadioField from "../../Components/ProductSystem/RadioField";
import ButtonGroup from "../../Components/ProductSystem/ButtonGroup";
import { remindText, inputRule } from "../../constants/inputText";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";
import LoadingPage from "../LoadingPage";
export default function ProductEdit() {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [img, setImg] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDeletePicture, setIsDeletePicture] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const fileInput = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.users.user);
  const product = useSelector((store) => store.products.product);
  const isLoading = useSelector(
    (store) => store.products.singleProductIsLoading
  );
  const vendor = useSelector((store) => store.vendors.vendor);
  const handleSubmit = () => {
    if (
      !name ||
      !price ||
      !quantity ||
      !categoryId ||
      !manufactureDate ||
      !expiryDate ||
      !description ||
      !img
    ) {
      dispatch(setErrorMessage("請填入所有欄位"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    if (!fileInfo || fileInfo.size <= 1048576) {
      dispatch(setErrorMessage(null));
      if (id !== "new") {
        dispatch(
          patchProduct(id, {
            picture: fileInfo,
            name,
            price,
            quantity,
            categoryId,
            manufactureDate,
            expiryDate,
            description,
            isAvailable,
          })
        ).then((res) => {
          if (res.ok === 1) {
            setTimeout(() => {
              history.push("/product_manage");
            }, 1000);
          }
        });
      } else {
        dispatch(
          postProduct({
            picture: fileInfo,
            name,
            price,
            quantity,
            categoryId,
            manufactureDate,
            expiryDate,
            description,
            isAvailable,
            isDeletePicture,
          })
        ).then((res) => {
          if (res.ok === 1) {
            setTimeout(() => {
              history.push("/product_manage");
            }, 1000);
          }
        });
      }
    }
  };

  if (id !== "new") {
    useEffect(() => {
      dispatch(getProduct(id));
      return () => dispatch(cleanProduct());
    }, [id, dispatch]);
  }

  const handleImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        dispatch(setErrorMessage("檔案過大"));
        dispatch(setShowWarningNotification(true));
        return;
      }
      setFileInfo(file);
      reader.onload = function (e) {
        setImg(e.target.result);
        dispatch(setErrorMessage(null));
        setIsEdited(true);
      };
      reader.onloadend = function () {
        fileInput.current.value = "";
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
      dispatch(setErrorMessage(null));
    }
  };

  useEffect(() => {
    dispatch(cleanProduct());
    dispatch(getVendor());
    dispatch(getProductCategories());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, []);

  useEffect(() => {
    if (user && user === "non-login") return history.push("/");
    if (
      user &&
      user !== "non-login" &&
      (user.role === "member" || user.role === "suspended")
    ) {
      return history.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (id !== "new" && product === 0) {
      return history.push("/");
    }
    if (product && vendor) {
      if (product.vendorId !== vendor.id) {
        return history.push("/");
      }
      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategoryId(product.categoryId);
      product.manufactureDate &&
        setManufactureDate(product.manufactureDate.slice(0, 10));
      product.expiryDate && setExpiryDate(product.expiryDate.slice(0, 10));
      setDescription(product.description);
      setIsAvailable(product.isAvailable);
      setImg(product.pictureUrl);
    }
    return () => dispatch(cleanProduct);
  }, [vendor, product]);

  useEffect(() => {
    if (product) {
      name !== product.name ||
      Number(price) !== product.price ||
      Number(quantity) !== product.quantity ||
      Number(categoryId) !== product.categoryId ||
      manufactureDate !== product.manufactureDate.slice(0, 10) ||
      expiryDate !== product.expiryDate.slice(0, 10) ||
      description !== product.description ||
      isAvailable !== product.isAvailable
        ? setIsEdited(true)
        : setIsEdited(false);
    }
  }, [
    name,
    price,
    quantity,
    categoryId,
    manufactureDate,
    expiryDate,
    description,
    isAvailable,
  ]);

  return (
    <Div
      w={{ xs: "100%", md: "70%" }}
      maxW={{ md: "37rem" }}
      m="0 auto"
      p={{ xs: "1.5rem", md: "0" }}
      d="flex"
      flexDir="column"
      align="center"
      justify="center"
    >
      {isLoading && <LoadingPage />}
      <Div w="100%" tag="h2" m={{ b: "1.5rem" }}>
        商品資料
      </Div>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Div d="flex" flexDir="column" align="center" justify="center" w="100%">
          <Div textSize="subheader" textAlign="left" w="100%">
            商品圖片
          </Div>
          <Div
            d="flex"
            align="center"
            justify="center"
            flexDir={{ xs: "column", md: "row" }}
          >
            <PreviewAvatar
              img={img}
              defaultImg={"defaultImage.png"}
              handleEvent={() => {
                setFileInfo(null);
                setImg(null);
                setIsDeletePicture(true);
                setIsEdited(true);
              }}
            />
            <UploadButton fileInput={fileInput} handleEvent={handleImg} />
          </Div>
        </Div>
        <Div w="100%" h="auto">
          <InputField
            name={"名稱"}
            type="text"
            value={name}
            handleEvent={(e) => setName(e.target.value)}
            remind={remindText.productName}
            rule={inputRule.productName}
            required={true}
          />
          <InputField
            name={"價錢"}
            type="number"
            value={price}
            handleEvent={(e) => setPrice(e.target.value)}
            remind={remindText.price}
            rule={inputRule.price}
            required={true}
          />
          <InputField
            name={"數量"}
            type="number"
            value={quantity}
            handleEvent={(e) => setQuantity(e.target.value)}
            remind={remindText.quqnaity}
            rule={inputRule.quqnaity}
            required={true}
          />
          <CategoryDropdown
            name={"類別"}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            remind={remindText.categoryId}
          />
          <InputField
            name={"製造日期"}
            type="date"
            value={manufactureDate}
            handleEvent={(e) => setManufactureDate(e.target.value)}
            remind={remindText.manufactureDate}
            rule={inputRule.manufactureDate}
            required={true}
          />
          <InputField
            name={"有效期限"}
            type="date"
            value={expiryDate}
            handleEvent={(e) => setExpiryDate(e.target.value)}
            remind={remindText.expiryDate}
            rule={inputRule.expiryDate}
            required={true}
          />
          <InputField
            name={"商品介紹"}
            type="textarea"
            value={description}
            handleEvent={(e) => setDescription(e.target.value)}
            remind={remindText.description}
            rule={inputRule.description}
            required={true}
          />
          <RadioField
            name={"供應中"}
            value={isAvailable}
            handleEvent={setIsAvailable}
            remind={remindText.isAvailable}
          />
        </Div>

        <ButtonGroup
          handleEvent={() => history.push(`/product_manage`)}
          isLoading={isLoading}
          isDisabled={!isEdited || isLoading}
          submitString={(id === "new" && "新增") || "更新"}
          key={!isEdited || isLoading}
        />
      </form>
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
