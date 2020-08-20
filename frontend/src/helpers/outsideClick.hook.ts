import React, {useEffect} from "react";

const useOutsideAlerter = (ref: React.RefObject<any>, callback: () => void) => {
  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
        // alert("clicked");
      }
    }

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [callback, ref]);
};

export default useOutsideAlerter;
