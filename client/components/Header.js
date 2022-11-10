import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

const Container = styled.nav`
  position: relative;
  width: 100%;
  height: 80px;
  z-index: 1;
  > div {
    max-width: 1200px;
    width: 100%;
    background: #fff;
    color: #3399ff;
    padding: 20px;
    top: 0;
    position: fixed;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(15, 23, 42, 0.1);
  }

  h3 {
    font-size: 20px;
    color: #3399ff;
  }
`;

const Header = () => {
  const router = useRouter();
  const title = useMemo(
    () => router.pathname.split("/")[1].toLocaleUpperCase(),
    [router.pathname]
  );

  return (
    <Container>
      <div>
        <div>
          <img
            src="/images/logo-192.png"
            alt="Vercel Logo"
            width={40}
            height={40}
          />
        </div>
        <h3>{title}</h3>
        <div />
      </div>
    </Container>
  );
};

export default Header;
