import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

const Container = styled.footer`
  position: relative;
  width: 100%;
  height: 80px;

  > ul {
    max-width: 1200px;
    width: 100%;
    background: #3399ff;
    color: white;
    /*background: #f0f9ff;
    color: #0284c7;*/
    bottom: 0;
    position: fixed;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > li {
      width: 100%;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }
`;

const Footer = () => {
  const router = useRouter();

  return (
    <Container>
      <ul>
        <li onClick={() => router.push("/home")}>Home</li>
        <li onClick={() => router.push("/list")}>List</li>
        <li onClick={() => router.push("/post")}>Post</li>
      </ul>
    </Container>
  );
};

export default Footer;
