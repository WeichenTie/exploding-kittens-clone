import { useEffect, useRef, useState } from "react";


const useComponentDimension = (id: string) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const thisElem = useRef<HTMLElement>(undefined);

    useEffect(()=>{
        thisElem.current = document.getElementById(id);
        setHeight(thisElem.current.clientHeight);
        setWidth(thisElem.current.clientWidth);
        window.addEventListener('resize', () => {
            setHeight(thisElem.current.clientHeight);
            setWidth(thisElem.current.clientWidth);
        })
    }, [])
    return { width, height }
}

export default useComponentDimension;