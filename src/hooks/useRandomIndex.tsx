import { useState, useRef, useEffect } from "react";

export default function useRandomIndex<T>(array: T[] | undefined) {
    const [randomInt, setRandomInt] = useState(0);
    const hasRandom = useRef(false);

    useEffect(() => {
        if (array?.length && !hasRandom.current) {
            setRandomInt(Math.floor(Math.random()*array.length))
            hasRandom.current = true;
        }
    }, [array])

    return randomInt
}