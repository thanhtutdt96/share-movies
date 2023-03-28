import { rest } from "msw";
import { API_PATH } from "assets/constants";

// Mock Data
const me = {
  email: "thanhtutdt96@gmail.com",
  id: 1,
};

export const sharedMovies = [
  {
    title: "Highlights GEN vs HLE | Game 4 | Playoffs Round 2 | LCK Mùa Xuân 2023",
    description:
      "Highlights GEN vs HLE | Game 4 | Playoffs Round 2 | LCK Mùa Xuân 2023\n- - - - - - - - - - - - - - - ...",
    embedId: "q6HHfRvxNSc",
    email: "thanhtutdt96@gmail.com",
    createdAt: 1679898440072,
    id: 1,
  },
  {
    title: "Lu Talkshow: C.h.ế.t hụt sống dai - T1 bất tử",
    description:
      "Lu Talkshow: C.h.ế.t hụt sống dai - T1 bất tử\n\nĐăng kí thành viên kênh Lu để nhận những quyền lợi đặ...",
    embedId: "70uHa8uGmew",
    email: "thanhtutdt96@gmail.com",
    createdAt: 1679898448218,
    id: 2,
  },
  {
    title: "Web Developer Portfolio - 9.5/10 (Front End, React)",
    description:
      "Web Developer Portfolio\nWelcome to our latest video on Web Developer Portfolio, where we will be dis...",
    embedId: "VjiWpGR82t0",
    email: "abc@mail.com",
    createdAt: 1679919158962,
    id: 3,
  },
];

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  rest.get("/shared-movies", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sharedMovies));
  }),

  rest.get("/me", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(me));
  }),
];
