import Tile from "@/components/Tile";
import { Movie } from "@/utils/types";
import { useState, useRef, useEffect } from "react";
import useWindowSize from "@/utils/resize";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import "./styles.css";

export default function Slider({
  label,
  movies,
}: {
  label: string;
  movies: Movie[];
}) {
  const [windowWidth, _] = useWindowSize();
  const [cooldown, setCooldown] = useState(0);
  const [slide, setSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slidesPerScroll, setSlidesPerScroll] = useState(0);
  const slider = useRef<HTMLDivElement>();

  useEffect(() => {
    calculate();
  }, [windowWidth]);

  useEffect(() => {
    setActiveSlides();
  }, [slideWidth, slidesPerScroll]);

  // once slider is loaded, calculate constants
  const calculate = () => {
    if (!slider.current) return;
    const sliderWidth = slider.current.getBoundingClientRect().width;
    if (!slider.current.children[0]) return;
    const tempWidth =
      slider.current.children[0].getBoundingClientRect().width + 30;
    setSlideWidth(tempWidth);
    setSlidesPerScroll(Math.round((sliderWidth + 30) / tempWidth));
  };

  const setActiveSlides = () => {
    if (!slider.current) return;
    const tempSlide = Math.min(
      slide,
      slider.current.childElementCount - slidesPerScroll
    );
    setSlide(tempSlide);
    for (let i = 0; i < slider.current.childElementCount; i++) {
      slider.current.children[i].classList.remove("Tile--active");
      if (i >= tempSlide && i < tempSlide + slidesPerScroll)
        slider.current.children[i].classList.add("Tile--active");
    }
  };

  // try to scroll by some # of slides, scroll by less if would overscroll
  // 200ms cooldown per attempt
  const scroll = (offset: number) => {
    if (Date.now() < cooldown) return;
    if (!slider.current) return;

    // x-pos of right edge of last slide
    let bound =
      slider.current.children[
        slider.current.childElementCount - 1
      ].getBoundingClientRect().x +
      slideWidth -
      30;

    // scroll attempts for positive offset
    for (let i = 0; i < offset; i++) {
      if (bound > windowWidth) {
        bound -= slideWidth;
        slider.current.children[slide + i].classList.remove("Tile--active");
        slider.current.children[slide + i + slidesPerScroll].classList.add(
          "Tile--active"
        );
      } else {
        offset = i;
        break;
      }
    }

    // scroll attempts for negative offset
    for (let i = 0; i > offset; i--) {
      if (slide + i > 0) {
        slider.current.children[
          slide + i - 1 + slidesPerScroll
        ].classList.remove("Tile--active");
        slider.current.children[slide + i - 1].classList.add("Tile--active");
      } else {
        offset = i;
        break;
      }
    }
    setCooldown(Date.now() + 300);
    setSlide(slide + offset);
  };

  return (
    <div className="Slider">
      <div className="Slider__wrapper">
        <span className="Slider__label text-2xl">{label}</span>
        <div
          className="Slider__content"
          ref={(el: HTMLDivElement) => {
            slider.current = el;
            calculate();
          }}
          style={{
            transform: "translateX(" + slide * -slideWidth + "px)",
          }}
        >
          {movies.map((movie: Movie, i: number) => {
            return <Tile movie={movie} key={i} />;
          })}
        </div>
        {slide > 0 && (
          <div
            className="Slider__control Slider__control--left text-6xl"
            onClick={() => {
              scroll(-slidesPerScroll);
            }}
          >
            <LuChevronLeft />
          </div>
        )}
        {slide + slidesPerScroll < (slider.current?.childElementCount ?? 0) && (
          <div
            className="Slider__control text-6xl"
            onClick={() => {
              scroll(slidesPerScroll);
            }}
          >
            <LuChevronRight />
          </div>
        )}
      </div>
    </div>
  );
}
