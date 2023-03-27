import { FC } from "react";
import MovieItemVideo from "components/MovieItem/MovieItemVideo";

interface Props {
  title: string;
  embedId: string;
  email?: string;
  description?: string;
  className?: string;
}
const MovieItem: FC<Props> = ({ title, embedId, email, description, className }) => {
  return (
    <div className={`grid lg:grid-cols-2 gap-x-8 items-center ${className ? className : ""}`}>
      <MovieItemVideo embedId={embedId} title={title} />
      <div className="flex flex-col text-left mt-3 lg:mt-0 self-start">
        <h3 className="text-secondary font-bold text-lg">{title}</h3>
        {email && (
          <p className="mt-2 text-neutral-content text-base font-medium">
            Share by{" "}
            <a className="link link-info" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        )}

        {description && (
          <>
            <h5 className="text-accent-content font-medium mt-4">Description:</h5>
            <p className="text-sm mt-1">{description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieItem;
