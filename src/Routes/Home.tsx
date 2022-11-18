import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getPopMovies, IGetMoviesResult } from "../api";
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
`;

function Home() {
  const { data: nowplaying, isLoading: nowLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const { data: popular, isLoading: popLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopMovies
  );

  return (
    <Wrapper>
      {nowLoading || popLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowplaying?.results[0].backdrop_path || "")}
            title={nowplaying?.results[0].title}
            overview={nowplaying?.results[0].overview}
          />
          <SlideWrapper>
            <SliderC
              title="현재 상영중인 영화"
              program="movies"
              category="nowplaying"
              results={nowplaying?.results}
            />
            <SliderC
              title="사람들에게 인기많은 영화"
              program="movies"
              category="popular"
              results={popular?.results}
            />
          </SlideWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
