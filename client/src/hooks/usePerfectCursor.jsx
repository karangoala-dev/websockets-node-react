import { PerfectCursor } from "perfect-cursors";
import { useCallback, useLayoutEffect, useState } from "react";

export function usePerfectCursor(cb, point) {
  const [pc] = useState(() => new PerfectCursor(cb));

  useLayoutEffect(() => {
    if (point) {
      console.log("Adding point inside useEffect:", point); // Add a log to verify point
      pc.addPoint(point);
    }
    console.log("PerfectCursor initialized", pc);
    return () => {
      console.log("Disposing PerfectCursor");
      pc.dispose();
    };
  }, [point, pc]); // Add point to dependency array

  const onPointChange = useCallback(
    (point) => {
      console.log("onPointChange called with point:", point);
      pc.addPoint(point);
    },
    [pc]
  );

  return onPointChange;
}
