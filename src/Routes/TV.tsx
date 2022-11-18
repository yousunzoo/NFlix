import { useQuery } from "react-query";
import styled from "styled-components";
import { getHighRateTVs, getPopTVs, getTVs, IGetTVsResult } from "../api";
import { makeImagePath } from "../utils";
import Banner from "../Components/Banner";
import SliderC from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(8.25rem, 17.6vw, 22rem);
  padding-block: 2%;
`;

function TV() {
  const { data: onAir, isLoading: onAirLoading } = useQuery<IGetTVsResult>(
    ["TVs", "onAir"],
    getTVs
  );
  const { data: popular, isLoading: popularLoading } = useQuery<IGetTVsResult>(
    ["TVs", "popular"],
    getPopTVs
  );
  const { data: high, isLoading: highLoading } = useQuery<IGetTVsResult>(
    ["TVs", "high"],
    getHighRateTVs
  );

  return (
    <Wrapper>
      {onAirLoading || popularLoading || highLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(onAir?.results[0].backdrop_path || "")}
            title={onAir?.results[0].name}
            overview={onAir?.results[0].overview}
          />
          <SlideWrapper>
            <SliderC
              title="현재 방송중인 프로그램"
              program="tv"
              category="onAir"
              results={onAir?.results}
            />
            <SliderC
              title="사람들에게 인기많은 프로그램"
              program="tv"
              category="popular"
              results={popular?.results}
            />

            <SliderC
              title="평점이 높은 프로그램"
              program="tv"
              category="high"
              results={high?.results}
            />
          </SlideWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default TV;
