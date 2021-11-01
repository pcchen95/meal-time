import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Icon, Div } from "atomize";
import styled from "styled-components";
import UploadButton from "../../Components/VendorSystem/UploadButton";

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

const PreviewArea = ({ banner, handleDelete, isDisabled }) => {
  return (
    <Div
      pos="relative"
      w="100%"
      h="15rem"
      rounded="10px"
      bgImg={banner || "defaultBanner.jpg"}
    >
      <Div pos="absolute" top="1rem" left="1rem" d="flex">
        {banner && !isDisabled && <Delete handleDelete={handleDelete} />}
      </Div>
    </Div>
  );
};

PreviewArea.propTypes = {
  banner: PropTypes.string,
  handleDelete: PropTypes.func,
  isDisabled: PropTypes.bool,
};

const BannerPreview = ({
  banner,
  handleBanner,
  bannerInput,
  handleDelete,
  isDisabled,
}) => {
  const location = useLocation();

  return (
    <Div>
      {location.pathname === "/update_store" && (
        <Div d="flex" flexDir="column" align="flex-start" justify="flex-start">
          <Div>賣場主圖</Div>
          {!isDisabled && (
            <>
              <UploadButton
                fileInput={bannerInput}
                handleEvent={handleBanner}
              />
            </>
          )}
        </Div>
      )}
      <PreviewArea
        banner={banner}
        handleDelete={handleDelete}
        isDisabled={isDisabled}
      />
    </Div>
  );
};

BannerPreview.propTypes = {
  banner: PropTypes.string,
  handleBanner: PropTypes.func,
  bannerInput: PropTypes.object,
  handleDelete: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default BannerPreview;
