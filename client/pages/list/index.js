import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  position: relative;
  padding-bottom: 120px;
  overflow: scroll;
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 30px;
  padding: 22px 22px 100px;

  > li {
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(15, 23, 42, 0.1);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    cursor: pointer;
    &:hover {
      border: 1px solid #94a3b8;
      transition: all 0.3s;
    }

    > h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    > img {
      width: 100%;
      object-fit: cover;
      height: auto;
      margin-bottom: 10px;
      margin-top: 20px;
      border-radius: 8px;
    }

    > div {
      font-size: 12px;
      border-bottom: 1px solid rgba(15, 23, 42, 0.1);
      padding-bottom: 20px;
    }
  }
`;

const Index = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const list = data.map((el) => JSON.parse(el)).reverse();
        setList(list);
      });
  }, []);

  return (
    <Container>
      <List>
        {!list?.length ? (
          <p>게시물 없음</p>
        ) : (
          list.map((item) => {
            return (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <div>{item.content}</div>

                <img
                  src={item.image}
                  alt="크리스마스 이미지"
                  width="40"
                  height="40"
                />
              </li>
            );
          })
        )}
      </List>
    </Container>
  );
};

export default Index;
