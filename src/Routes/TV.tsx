import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTVs, IGetMoviesResult, IGetTVsResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TV() {
  const { data, isLoading } = useQuery<IGetTVsResult>(["tvs", "onAir"], getTVs);
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            title={data?.results[0].name}
            overview={data?.results[0].overview}
          />
        </>
      )}
    </Wrapper>
  );
}
export default TV;
