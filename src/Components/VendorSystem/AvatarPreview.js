import React from "react";
import PropTypes from "prop-types";
import { Div, Icon } from "atomize";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";

const PreviewImg = styled.div`
  position: relative;
  width: 14rem;
  height: 14rem;
  border-radius: 50%;

  ${(props) =>
    props.image
      ? `
      background: url(${props.image}) no-repeat center/cover;
  `
      : `background: url("defaultAvatar.png") no-repeat center/cover;`}
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

const AvatarPreview = ({ image, handleDelete }) => {
  const location = useLocation();
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isOpen || isSuspended);
  return (
    <Div w={{ xs: "100%", md: "auto" }} d="flex" justify="center">
      <PreviewImg image={image}>
        <Div
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          d="flex"
        >
          {image && !isDisabled && location.pathname === "/update_store" && (
            <Delete handleDelete={handleDelete} />
          )}
        </Div>
      </PreviewImg>
    </Div>
  );
};

AvatarPreview.propTypes = {
  image: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default AvatarPreview;
