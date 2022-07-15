import React, { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";

const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 768px;
  font-family: "DM Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <GlobalContainer>
    <Header />
    <Container>{props.children}</Container>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: "DM Sans";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
  </GlobalContainer>
);

export default Layout;
