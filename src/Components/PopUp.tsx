import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useState } from "react";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -60px;
`;
const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -60px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IPop {
  cate: string;
  links: string;
  data: any;
}

function PopUp({ data, cate, links }: IPop) {
  const bigMatch = useMatch(`${links}/:id`);
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };
  const { scrollY } = useScroll();
  const clickedProgram =
    bigMatch?.params.id &&
    data.find((program: any) => program.id + "" === bigMatch.params.id);

  console.log(bigMatch);

  return bigMatch && clickedProgram ? (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <BigMovie
        style={{
          top: scrollY.get() + 100,
        }}
        layoutId={bigMatch?.params.id + cate}>
        {clickedProgram && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedProgram.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigTitle>{clickedProgram.title || clickedProgram.name}</BigTitle>
            <BigOverview>{clickedProgram.overview}</BigOverview>
          </>
        )}
      </BigMovie>
    </>
  ) : null;
}

export default PopUp;
