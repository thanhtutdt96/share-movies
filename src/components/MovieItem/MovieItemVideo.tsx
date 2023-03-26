import { FC } from "react";

interface Props {
  embedId: string;
  title: string;
}
const MovieItemVideo: FC<Props> = ({ embedId, title }) => (
  <div className="video-responsive overflow-hidden pb-[56.25%] relative h-0">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
      className="left-0 top-0 absolute w-full h-full"
    />
  </div>
);

export default MovieItemVideo;
