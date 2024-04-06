import { useLayoutEffect, useState } from "react";
import debounce from "./debounce";

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = debounce(() => {
      setSize([window.innerWidth, window.innerHeight]);
    });
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
