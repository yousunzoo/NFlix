import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { makeImagePath } from "../utils";

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
  category: string;
  clickedProgram: any;
  links: string;
}

function PopUp({ clickedProgram, category, links }: IPop) {
  const bigMatch = useMatch(`/${links}/:id`);
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(-1);
  const { scrollY } = useScroll();

  return bigMatch ? (
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
        layoutId={bigMatch?.params.id + category}>
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
            <BigTitle>{clickedProgram.title}</BigTitle>
            <BigOverview>{clickedProgram.overview}</BigOverview>
          </>
        )}
      </BigMovie>
    </>
  ) : null;
}

export default PopUp;
