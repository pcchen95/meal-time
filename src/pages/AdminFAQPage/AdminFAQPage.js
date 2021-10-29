import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Div } from "atomize";
import { getFaqs, getFaqCategories } from "../../redux/reducers/systemReducer";

function FAQList({ question, answer }) {
  return (
    <Div
      border="1px solid"
      m={{ t: "2rem" }}
      p="1rem"
      rounded="sm"
      d="flex"
      justify="space-between"
    >
      {" "}
      <Div d="flex">
        <Div transform="translateY(25%)">{question}</Div>
        <Div transform="translateY(25%)" m={{ l: "1rem" }}>
          {answer}
        </Div>
      </Div>
    </Div>
  );
}

const AdminFAQPage = () => {
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
    <Div>
      <Div m={{ l: "5rem", r: "5rem" }}>
        {faqs &&
          faqs.map((faq) => (
            <FAQList key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
      </Div>
    </Div>
  );
};

FAQList.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
};

export default AdminFAQPage;
