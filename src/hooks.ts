import React from "react";

export function useIsMounted() {
  const componentIsMounted = React.useRef(true);
  React.useEffect(
    () => () => {
      componentIsMounted.current = false;
    },
    []
  );
  return () => componentIsMounted.current;
}
