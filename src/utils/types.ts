export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieFull = {
  adult: boolean;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type User = {
  user: {
    id: string;
    username: string;
    role: string;
    pfp: string;
  };
  followers: string[];
  following: string[];
  watchlist: number[];
};

// undefined as default before checking if logged in
// once checked, null if not logged in
export type UserContext = {
  user: User | null | undefined;
  getUser: () => void;
  setUser: React.Dispatch<any>;
};

export type Rating = {
  userId: string;
  username: string;
  pfp: string;
  movieId: number;
  movieName: string;
  score: number;
  review: string;
  submitted: number; // timestamp
};
