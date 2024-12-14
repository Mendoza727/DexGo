import React, { useEffect, useState } from 'react';

export const useDebounceValue = (input: string = '', timer: number = 500) => {
    const [debounceValue, setDebounceValue] = useState<string | null>(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(input);
        }, timer);

        return () => {
            clearTimeout(timeout);
        };
    }, [input]);

    return debounceValue;
};
