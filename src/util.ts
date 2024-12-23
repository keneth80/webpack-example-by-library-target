export const parseJson = (value: string) => {
    return value;
};

export function useState<T>(initialValue: T): [() => T, (value: T) => void] {
    let resultValue: T = initialValue;

    function setState(value: T) {
        resultValue = value;
    }

    function getState(): T {
        return resultValue;
    }

    return [getState, setState];
}

export function getQueryString(params: any) {
    return params ? '?' + new URLSearchParams(params).toString() : '';
}

export const debounce = (callback: (value?: any) => any, delayTime = 0) => {
    let timeout: any = null;
    return (...args: any[]) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        let result;
        timeout = setTimeout(() => {
            clearTimeout(timeout);
            result = callback(...args);
        }, delayTime);
        return result;
    };
};
