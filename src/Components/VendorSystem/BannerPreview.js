import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Icon, Div } from "atomize";
import styled from "styled-components";
import UploadButton from "../../Components/VendorSystem/UploadButton";

const PreviewImg = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  border-radius: 10px;

  ${(props) =>
    props.banner
      ? `
      background: url(${props.banner}) no-repeat center/cover;
  `
      : `background: rgb(183, 183, 183)`}
`;

const DeleteBtn = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  background: rgb(167, 167, 167);
  border-radius: 5px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Delete = ({ handleDelete }) => {
  return (
    <DeleteBtn>
      <Icon name="Delete" size="20px" color="black600" onClick={handleDelete} />
    </DeleteBtn>
  );
};

Delete.propTypes = {
  handleDelete: PropTypes.func,
};

const PreviewArea = ({ banner, handleDelete }) => {
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = !isOpen || isSuspended;
  return (
    <PreviewImg banner={banner}>
      <Div pos="absolute" top="1rem" left="1rem" d="flex">
        {banner && !isDisabled && <Delete handleDelete={handleDelete} />}
      </Div>
    </PreviewImg>
  );
};

PreviewArea.propTypes = {
  banner: PropTypes.string,
  handleDelete: PropTypes.func,
};

const BannerPreview = ({ banner, handleBanner, bannerInput, handleDelete }) => {
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isOpen || isSuspended);
  return (
    <Div>
      <Div d="flex" flexDir="column" align="flex-start" justify="flex-start">
        <Div>賣場主圖</Div>
        {!isDisabled && (
          <UploadButton fileInput={bannerInput} handleEvent={handleBanner} />
        )}
      </Div>
      <PreviewArea banner={banner} handleDelete={handleDelete} />
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        ref={bannerInput}
        onChange={handleBanner}
        style={{ display: "none" }}
        id="bannerInput"
        disabled={isDisabled}
      />
    </Div>
  );
};

BannerPreview.propTypes = {
  banner: PropTypes.string,
  handleBanner: PropTypes.func,
  bannerInput: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default BannerPreview;
