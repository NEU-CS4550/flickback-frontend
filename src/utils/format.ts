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

export function formatDate(date: number) {
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges: {
    [increment: string]: number;
  } = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (new Date(date).getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(
        Math.round(delta),
        key as Intl.RelativeTimeFormatUnit
      );
    }
  }
}
