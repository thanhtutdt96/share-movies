import { VALIDATE_YOUTUBE_URL_REGEX } from "assets/constants";

const useMovieHelper = () => {
  const getVideoIdFromUrl = (url: string) => {
    const match = url.match(VALIDATE_YOUTUBE_URL_REGEX);
    return match ? match[1] : null;
  };

  const truncateText = (maxCharacters: number, text?: string) => {
    if (!text?.length) {
      return "";
    }

    return text.slice(0, maxCharacters) + (text.length > maxCharacters ? "..." : "");
  };

  return {
    getVideoIdFromUrl,
    truncateText,
  };
};

export default useMovieHelper;
