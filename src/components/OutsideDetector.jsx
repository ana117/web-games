import {useEffect, useRef} from "react";

const OutsideDetector = ({ handleOutsideClick, children }) => {
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleOutsideClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return <div ref={ref}>{children}</div>;
}

export default OutsideDetector;