export const sleep = (sleepTime = 1000) => {
    return new Promise((resolve: any) => {
        const timeout = setTimeout(() => {
            resolve();
            clearTimeout(timeout);
        }, sleepTime);
    });
};

export function getMobileInfo() {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
    }

    if (/android|Android/.test(userAgent)) {
        return 'Android';
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return 'iOS';
    }

    return '';
}

export const debounce = (callback: any, delayTime = 0) => {
    let timeout: any = null;
    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            // 지정된 함수 실행
            callback(...args);
            // 함수 실행 후 settimeout clear
            clearTimeout(timeout);
        }, delayTime);
    };
};
