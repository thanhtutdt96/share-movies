import axios from "axios";
import { YOUTUBE_API_KEY, YOUTUBE_API_PATH } from "assets/constants";

export default axios.create({
  baseURL: YOUTUBE_API_PATH,
  params: {
    part: "snippet",
    key: YOUTUBE_API_KEY,
  },
});
