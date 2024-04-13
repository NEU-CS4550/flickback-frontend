import Button from "@/components/Button";

import "./styles.css";
import { Link } from "react-router-dom";
import { LuHome } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="NotFound">
      <span className="NotFound__code text-6xl sm:text-8xl">404</span>
      <span className="NotFound__title text-3xl">Page Not Found</span>
      <span className="NotFound__info">
        We couldn't find what you were looking for. Make sure you enter a valid
        URL and try again, or return to the home page!
      </span>
      <Link to="/">
        <Button icon>
          <LuHome className="text-xl" />
          Home Page
        </Button>
      </Link>
    </div>
  );
}
