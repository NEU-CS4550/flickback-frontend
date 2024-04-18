import { Alert as AlertT } from "@/utils/types";
import { useEffect, useRef } from "react";
import { useAlert } from "@/utils/alert";

import "./styles.css";

export default function Alert({
  alert,
  lifespan = 5000,
}: {
  alert: AlertT;
  lifespan?: number;
}) {
  const self = useRef<HTMLDivElement>(null);
  const { dismiss } = useAlert();

  const fadeOut = () => {
    if (!self.current) return;
    const target = self.current;
    if (target.classList.contains("Alert--fade")) return;
    target.classList.add("Alert--fade");
    target.addEventListener("transitionend", () => {
      target.classList.add("Alert--dismiss");
      if (
        target.classList.contains("Alert--dismiss") &&
        getComputedStyle(target).height == "0px"
      ) {
        dismiss(alert.id);
      }

      target.style.height = target.offsetHeight + "px";
      target.offsetHeight;
      target.style.height = "0";
    });
  };

  useEffect(() => {
    if (!self.current) return;
    setTimeout(fadeOut, lifespan);
  }, [self]);

  return (
    <div
      ref={self}
      className={"text-sm Alert Alert--" + alert.type}
      onClick={fadeOut}
    >
      {alert.message}
    </div>
  );
}
