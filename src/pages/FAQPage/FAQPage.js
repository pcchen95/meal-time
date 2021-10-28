import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Div, Icon, Button, Collapse } from "atomize";
import {
  getFaqs,
  cleanFaqs,
  getFaqCategories,
} from "../../redux/reducers/systemReducer";

const SingleQuestion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Div m={{ b: "0.5rem" }}>
      <Div d="flex" m={{ l: "-0.75rem" }}>
        <Button
          h="2.5rem"
          w="2.5rem"
          bg="white"
          hoverBg="warning300"
          rounded="circle"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Icon name="DownArrow" size="20px" color="black900" />
        </Button>
        <Div
          transform="translateY(20%)"
          textWeight="500"
          textColor="black500"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          cursor="pointer"
        >
          {question}
        </Div>
      </Div>
      <Collapse isOpen={isOpen}>
        <Div textWeight="500" textColor="gray800">
          {answer}
        </Div>
      </Collapse>
      <Div
        border="1px solid"
        borderColor="warning700"
        w="3rem"
        m={{ t: "1rem" }}
      ></Div>
    </Div>
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
};

const FAQPage = () => {
  const dispatch = useDispatch();

  const faqs = useSelector((store) => store.system.faqs);
  const categories = useSelector((store) => store.system.faqCategories);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    dispatch(getFaqCategories({}));
  }, []);

  useEffect(() => {
    if (categories) {
      setCategoryId(categories[0].id);
      dispatch(getFaqs({ categoryId: categories[0].id, order: "ASC" }));
    }
  }, [categories]);

  useEffect(() => {
    dispatch(getFaqs({ categoryId, order: "ASC" }));
  }, [categoryId]);
  return (
    <Div
      w={{ xs: "100%", md: "700px" }}
      m="0 auto"
      p={{ x: "2rem", b: "3rem" }}
    >
      <Div
        tag="header"
        m={{ b: "1rem" }}
        textWeight="800"
        textColor="black800"
        textSize="heading"
        w="100%"
        textAlign="center"
      >
        常見問題
      </Div>

      <Div d="flex" p={{ x: "0.5rem" }}>
        {categories &&
          categories.map((category) => (
            <Button
              key={category.id}
              h="2.5rem"
              p={{ x: { xs: "0.5rem", sm: "1rem" } }}
              textSize={{ xs: "caption", sm: "body" }}
              textColor={categoryId === category.id ? "white" : "gray900"}
              hoverTextColor={categoryId === category.id ? "white" : "gray900"}
              bg={categoryId === category.id ? "gray900" : "white"}
              hoverBg={categoryId === category.id ? "gray900" : "gray200"}
              border="1px solid"
              borderColor="gray700"
              onClick={() => {
                setCategoryId(category.id);
                dispatch(cleanFaqs());
              }}
            >
              {category.name}
            </Button>
          ))}
      </Div>
      <Div pos="relative">
        <Div
          w="100%"
          h="1.5rem"
          bg="gray900"
          pos="absolute"
          top="-5px"
          left="0"
          rounded="sm"
          border="1px solid"
          borderColor="gray700"
        ></Div>
      </Div>
      <Div
        w="100%"
        border="1px solid"
        borderColor="gray700"
        p={{ y: "2rem", x: "1rem" }}
        rounded="sm"
      >
        {faqs &&
          faqs.map((faq) => (
            <SingleQuestion
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
      </Div>
    </Div>
  );
};

export default FAQPage;
