import React from "react";
export const useHTMLElement = (defaultValue, mapper) => {
    const [value, setValue] = React.useState(defaultValue);
    const nodeRef = React.useRef(null);
    React.useEffect(() => {
        if (nodeRef.current) {
            let cancel = false;
            const update = () => {
                if (!cancel && nodeRef.current) {
                    setValue(mapper(nodeRef.current));
                }
            };
            window.requestAnimationFrame(update);
            window.addEventListener("resize", update);
            return () => {
                window.removeEventListener("resize", update);
                cancel = true;
            };
        }
    }, [mapper]);
    return [nodeRef, value];
};
