import styled from "styled-components";
import React from "react";

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(15, 10, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 55px;
  margin-bottom: 30px;
  font-weight: 700;
`;
const Overview = styled.p`
  font-size: 24px;
  line-height: 1.4;
  width: 50%;
  word-break: keep-all;
`;
interface IBanner {
  bgPhoto: string;
  title?: string;
  overview?: string;
}
function Banner(props: IBanner) {
  return (
    <>
      <Wrapper bgPhoto={props.bgPhoto}>
        <Title>{props.title}</Title>
        <Overview>{props.overview}</Overview>
      </Wrapper>
    </>
  );
}

export default Banner;
