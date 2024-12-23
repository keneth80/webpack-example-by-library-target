import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * @title makeAxios
 * @param <any>configuration(optional)
 * @returns AxiosInstance
 * @description 공통 이벤트 처리가 적용된 axios instance를 생성해주는 함수
 */
export function makeAxios(configuration?: any): AxiosInstance {
    const axios: AxiosInstance = Axios.create({
        withCredentials: true,
    });

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response && error.response.status) {
                switch (error.response.status) {
                    case 401:
                        // TODO: 로그인 페이지 처리 event dispatch
                        return new Promise(() => {});
                    default:
                        return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return axios;
}

export class FEAxiosInstance {
    private static INSTANCE: AxiosInstance;
    public static getInstance(): AxiosInstance {
        if (!FEAxiosInstance.INSTANCE) {
            FEAxiosInstance.INSTANCE = Axios.create();
        }
        return FEAxiosInstance.INSTANCE;
    }
}

export const setRequestInterceptorByHeaderToken = (token: string) => {
    return FEAxiosInstance.getInstance().interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

export const removeTokenInterceptor = (config: AxiosRequestConfig) => {
    delete config.headers.common.Authorization;
    return config;
};

export function setRequestInterceptor(interceptor: any): number {
    return FEAxiosInstance.getInstance().interceptors.request.use(interceptor);
}

export function removeRequestInterceptor(interceptorId: number): void {
    FEAxiosInstance.getInstance().interceptors.request.eject(interceptorId);
}

export function setResponseInterceptor(interceptor: any): number {
    return FEAxiosInstance.getInstance().interceptors.response.use(interceptor);
}

export function setReponseErrorInterceptor(interceptor: any): number {
    return FEAxiosInstance.getInstance().interceptors.response.use(function (response) {
        return response;
    }, interceptor);
}

export function removeResponseInterceptor(interceptorId: number): void {
    FEAxiosInstance.getInstance().interceptors.response.eject(interceptorId);
}
