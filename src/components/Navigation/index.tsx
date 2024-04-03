import { LuSearch } from "react-icons/lu";

import "./styles.css";

export default function Navigation() {
  return (
    <div className="Navigation">
      <div className="Navigation__Wrapper container">
        <div className="Navigation__Logo ">FlickBack</div>
        <div className="Navigation__Icons">
          <div className="Navigation__Icon">
            <LuSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
