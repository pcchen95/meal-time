import { Div, Button } from "atomize";

export function ButtonGroup({ isDisabled, handleSubmit, handleBack, vendor }) {
  return (
    <Div d="flex" p="1rem" justify="center">
      <Button
        h="3rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor={!isDisabled && "info900"}
        bg="white"
        hoverBg={!isDisabled && "info200"}
        border="1px solid"
        borderColor="info700"
        hoverBorderColor={!isDisabled && "info900"}
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        {vendor ? "提交修改" : "註冊"}
      </Button>
      <Button
        type="button"
        h="3rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor="info900"
        bg="white"
        hoverBg="info200"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        m={{ l: "0.5rem" }}
        onClick={handleBack}
      >
        取消
      </Button>
    </Div>
  );
}
export default ButtonGroup;
