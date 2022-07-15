import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

const StyledHeaderContainer = styled.nav`
  width: 100%;
  height: 65px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 50px;
`;

const StyledHeader = styled.div`
  width: 768px;
`;

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <Image src="/notable_aws_logo.png" width={124} height={20} />
      </StyledHeader>
    </StyledHeaderContainer>
  );
};

export default Header;
