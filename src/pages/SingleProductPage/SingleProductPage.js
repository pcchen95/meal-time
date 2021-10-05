import React from "react";
import { Div, Text, Col, Button } from "atomize";

export default function SingleProductPage() {
  const productsList = (
    <>
      {["食物名稱", "食物名稱", "食物名稱"].map((name, index) => (
        <Div key={index} p={{ l: { xs: "3rem", lg: "1rem" } }}>
          <Col>
            <Div
              bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              bgSize="cover"
              bgPos="center"
              h="8rem"
              w="8rem"
              m={{ t: "1rem" }}
            />
          </Col>
          <Text m={{ y: "1rem", l: "2.2rem" }}>{name}</Text>
        </Div>
      ))}
    </>
  );

  return (
    <Div w={{ xs: "80%", lg: "60%" }} m={{ y: "2rem", x: "auto" }}>
      <Div d="flex">
        <Text>Home</Text>/<Text>Category</Text>
      </Div>
      <Div d={{ xs: "block", xl: "flex" }} w={{ xs: "18rem", lg: "30rem" }}>
        <div>
          <Col>
            <Div
              bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              bgSize="cover"
              bgPos="center"
              h={{ xs: "20rem", lg: "30rem" }}
              m={{ l: "2rem", t: "1rem" }}
            />
          </Col>
          <Text
            h={{ xs: "12rem", lg: "30rem" }}
            w={{ xs: "15rem", lg: "30rem" }}
            bg="gray400"
            m={{ t: "3rem", l: "2rem" }}
            textSize="subheader"
            border="1px solid"
            shadow="2"
            borderColor="gray400"
            rounded="sm"
          >
            產品介紹
          </Text>
        </div>
        <Div m={{ l: { xs: "1rem", lg: "5rem" }, t: "2rem" }}>
          <div>
            <Text tag="h1">麵包</Text>
            <Text m={{ t: "1rem" }}>NT $ 0</Text>
            <Text m={{ t: "1rem" }}>Distance：</Text>
            <Text m={{ t: "1rem" }}>生產日期：</Text>
            <label>
              數量：
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
            <Button
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
              m={{ r: "0.5rem", t: "2rem" }}
            >
              放入購物車
            </Button>
          </div>
          <Div
            m={{ t: "2rem" }}
            minH="10rem"
            border={{ t: "2px solid" }}
            borderColor="gray600"
            d={{ xs: "block", lg: "flex" }}
            p={{
              l: { lg: "2rem", xs: "3.2rem" },
              y: { lg: "2rem", xs: "2rem" },
              r: { lg: "2rem", xs: "2rem" },
            }}
          >
            <Col>
              <Div
                bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                bgSize="cover"
                bgPos="center"
                w="8rem"
                h="8rem"
                rounded="circle"
                m={{ t: "1rem" }}
              />
            </Col>
            <Div minH="8rem" minW="12rem" m={{ l: "2rem" }}>
              <Text textSize="title" m={{ t: "1rem" }}>
                賣場名稱
              </Text>
              <Text textSize="subheader" m={{ t: "1rem" }}>
                賣場分類
              </Text>
            </Div>
          </Div>
          <Div border={{ t: "2px solid" }} borderColor="gray600" p="1rem">
            <Text textSize="subheader" m="1rem">
              此賣家其他食物
            </Text>
            <Div d={{ xs: "block", lg: "flex" }}>{productsList}</Div>
          </Div>
          <Div border={{ t: "2px solid" }} borderColor="gray600" p="1rem">
            <Text textSize="subheader" m="1rem">
              此分類其他食物
            </Text>
            <Div d={{ xs: "block", lg: "flex" }}>{productsList}</Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}
