import MovieItem from "components/MovieItem";
import Loader from "components/ui/Loader";
import { useGetSharedMoviesQuery } from "redux/services/coreApi";

const Home = () => {
  const { data: movies, isLoading } = useGetSharedMoviesQuery();

  return (
    <>
      <div className="hero min-h-screen py-7 items-start">
        <div className="hero-content text-center">
          <div className="lg:w-[800px] max-w-full flex flex-col gap-y-8 items-center">
            {isLoading && <Loader />}
            {!isLoading && movies?.length === 0 && "No movies available"}
            {movies?.map((movie) => (
              <MovieItem
                title={movie.title}
                embedId={movie.embedId}
                email={movie.email}
                description={movie.description}
                key={movie.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
