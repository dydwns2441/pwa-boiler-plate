import React, { useState } from "react";
import styled from "@emotion/styled";

const Form = styled.form`
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  margin: 10px;
  padding: 42px 22px;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  height: 43px;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(15, 23, 42, 0.1);
`;
const Textarea = styled.textarea`
  font-size: 16px;
  width: 100% !important;
  height: 300px !important;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgba(15, 23, 42, 0.1);
  resize: none;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
  > button {
    height: 45px;
    border-radius: 5px;
    font-size: 24px;
  }

  > button:nth-of-type(1) {
    border: 1px solid #3399ff;
    color: #3399ff;
    background-color: #fff;
  }
  > button:nth-of-type(2) {
    border: none;
    color: #fff;
    background-color: #3399ff;
  }
`;

const Index = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        id: new Date().toISOString(),
        title,
        content,
        image:
          "https://firebasestorage.googleapis.com/v0/b/pwa-boiler-palate.appspot.com/o/chrismas.jpeg?alt=media&token=6e20292d-8fbc-4a76-96f7-85f9ad7129e6",
      }),
    }).then((res) => {
      setContent("");
      setTitle("");
      if (res.status === 200) {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/push`, {
          method: "POST",
          body: JSON.stringify({
            title: "New post is Updated!!!!",
            body: "Come ASAP",
          }),
        });
      }
    });
  };

  return (
    <Form>
      {/*<h2>Title</h2>*/}
      <FormWrapper>
        <div>
          <Input
            value={title}
            autoComplete="off"
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/*<h2>Content</h2>*/}
        <div>
          <Textarea
            value={content}
            autoComplete="off"
            placeholder="200자 이하로 내용을 입력하세요"
            onChange={(e) => setContent(e.target.value)}
            maxLength="200"
          />
        </div>
      </FormWrapper>
      <ButtonWrapper>
        <button
          type="button"
          onClick={(e) => {
            setTitle("");
            setContent("");
          }}
        >
          reset
        </button>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          post
        </button>
      </ButtonWrapper>
    </Form>
  );
};

export default Index;
