import React from "react";
import { Div } from "atomize";

const RulesSection = () => {
  return (
    <Div m={{ l: "20rem", r: "20rem" }} fontFamily="primary">
      <Div
        tag="header"
        m={{ t: "3rem", b: "1rem" }}
        textWeight="800"
        textColor="black800"
        textSize="title"
      >
        免責聲明
      </Div>
      <Div m={{ b: "1rem" }}>
        <Div d="flex" m={{ l: "-0.75rem" }}></Div>
        <Div
          transform="translateY(20%)"
          textWeight="500"
          textColor="black500"
          m={{ b: "1rem" }}
        >
          當您使用本站，代表您了解並遵守以下規章：
        </Div>
        <Div
          transform="translateY(20%)"
          textWeight="500"
          textColor="black500"
          m={{ b: "1rem" }}
        >
          根據 FTC
          規定，請假設本站中所推薦的商家、產品均有合作關係，當使用者於站內連結到第三方商家網站並進行消費
          ，本站將獲得部分消費金額作為傭金回報並維持本站營運的開銷，但這不影響您所購買任何商品的價格，本站也不會
          多收您任何一分一毛。
        </Div>
        <Div
          transform="translateY(20%)"
          textWeight="500"
          textColor="black500"
          m={{ b: "1rem" }}
        >
          本站將不負責任何用戶與商家之間的交易。任何取消、更改訂單請直接與商家客服聯絡。本站將不參與及協助任何消費者與商家之間的糾紛。
        </Div>
        <Div
          transform="translateY(20%)"
          textWeight="500"
          textColor="black500"
          m={{ b: "1rem" }}
        >
          所有來信諮詢的信件我們不會將資料轉發給其他方或商家，信箱及個人資訊僅供本站與用戶聯繫。
        </Div>
      </Div>
    </Div>
  );
};
const RulesPage = () => {
  return (
    <Div>
      <RulesSection />
    </Div>
  );
};

export default RulesPage;
