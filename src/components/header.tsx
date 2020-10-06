import React from "react";
import styled from "styled-components";

export function Header() {
  // const Header = styled.header`
  //   padding: 20px 200px;
  //   font-size: 30px;
  //   border-bottom: 1px solid #515253;
  //   background-color: #111213;
  // `;

  const Header = styled.header({
    padding: "20px",
    borderBottom: "1px solid #515253",
    backgroundColor: "#111213",
  });

  return <Header />;
}