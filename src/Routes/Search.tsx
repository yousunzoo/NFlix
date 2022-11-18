import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch, IGetSearchResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;
const Error = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMsg = styled.h3`
  width: 50%;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`;

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Category = styled.div`
  width: 100%;
  padding-block: 10%;
`;
const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  padding-left: 6%;
  margin-bottom: 2%;
`;
const Row = styled.div`
  display: grid;
  gap: 20px;
  padding-inline: 6%;
  grid-template-columns: repeat(5, auto);
  width: 100%;
  margin: auto;
`;
const Box = styled(motion.div)`
  background-color: white;
  background-size: cover;
  background-position: center center;
  height: 160px;
  border-radius: 5px;
  font-size: 50px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
`;
const Info = styled(motion.div)`
  padding: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  opacity: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  }
`;

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetSearchResult>(
    ["search", keyword],
    () => getSearch(keyword)
  );
  console.log(keyword);
  const movies = data?.results.filter((data) => data.media_type === "movie");
  const tvs = data?.results.filter((data) => data.media_type === "tv");
  return (
    <Wrapper>
      {keyword ? (
        isLoading ? (
          <Loader>Loading...</Loader>
        ) : data?.results.length ? (
          <>
            <Category>
              <CategoryTitle>"{keyword}" 키워드를 포함하는 영화</CategoryTitle>
              <Row>
                {movies?.map((program) => (
                  <AnimatePresence>
                    <Box
                      key={program.id}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      style={{
                        backgroundImage: ` url(${makeImagePath(
                          program.backdrop_path || program.poster_path,
                          "w500"
                        )})`,
                      }}>
                      <Info variants={infoVariants}>
                        <h4>{program.title}</h4>
                      </Info>
                    </Box>
                  </AnimatePresence>
                ))}
              </Row>
            </Category>
            <Category>
              <CategoryTitle>
                "{keyword}" 키워드를 포함하는 TV 프로그램
              </CategoryTitle>
              <Row>
                {tvs?.map((program) => (
                  <AnimatePresence>
                    <Box
                      key={program.id}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      style={{
                        backgroundImage: ` url(${makeImagePath(
                          program.backdrop_path || program.poster_path,
                          "w500"
                        )})`,
                      }}>
                      <Info variants={infoVariants}>
                        <h4>{program.name}</h4>
                      </Info>
                    </Box>
                  </AnimatePresence>
                ))}
              </Row>
            </Category>
          </>
        ) : (
          <Error>
            <ErrorMsg>"{keyword}"에 대한 결과가 없습니다.</ErrorMsg>
          </Error>
        )
      ) : (
        <Error>
          <ErrorMsg>검색어를 입력해주세요</ErrorMsg>
        </Error>
      )}
    </Wrapper>
  );
}
export default Search;
