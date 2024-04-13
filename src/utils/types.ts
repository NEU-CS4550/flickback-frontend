export type Movie = {
  id: number;
  title: string;
  poster_path: string;
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
  id: string;
  username: string;
  role: string;
  pfp: string;
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

export type Alert = {
  id: number;
  type: string;
  message: string;
};

export type AlertContext = {
  alert: (type: string, message: string) => void;
  dismiss: (id: number) => void;
};
