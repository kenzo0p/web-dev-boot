import { useEffect, useRef } from "react";

export function usePrev(value) {
    const ref = useRef();
    console.log("rerender happen with a new value" + value);
    useEffect(() => {
        console.log("updated  with a new value" + value);
        ref.current = value;
    }, [value]);
    console.log("returned" + ref.current);
    return ref.current;
}
//it return first effect get called later

/*
Console logs => 

 rerender happen with a new value1
 returned0
 updated  with a new value1
 rerender happen with a new value2
 returned1
 updated  with a new value2

*/
