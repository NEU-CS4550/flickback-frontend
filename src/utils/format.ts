export function formatRuntime(minutes: number) {
  const m = minutes % 60;
  const h = (minutes - m) / 60;
  return (h > 0 ? h + "h " : "") + m + "m";
}

export function formatGenres(genres: { id: number; name: string }[]) {
  const genreNames = genres.map((genre) => {
    return genre.name;
  });
  return genreNames.join(", ");
}
