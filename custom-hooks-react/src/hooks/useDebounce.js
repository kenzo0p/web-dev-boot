import {  useRef } from "react";

export function useDebounce(originalFn){
    const currClock = useRef();
    
    const fn = () => {
        clearTimeout(currClock.current)
        currClock.current = setTimeout(originalFn, 200)
    }

    return fn
}