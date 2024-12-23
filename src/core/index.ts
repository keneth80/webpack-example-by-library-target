export interface Application {
    load(): void;
}

export class FEApplication {
    bootstrap(initApplication: Application): void {
        initApplication?.load();
    }
}

export class FEConfiguration {
    private static INSTANCE: FEConfiguration;
    private configurationContext: any = {};

    constructor(configration?: any) {
        if (configration) this.configurationContext = configration;
    }
    get configuration() {
        return this.configurationContext;
    }

    public static getInstance(configration?: any): FEConfiguration {
        if (!FEConfiguration.INSTANCE) {
            FEConfiguration.INSTANCE = new FEConfiguration(configration);
        }
        if (configration) {
            FEConfiguration.getInstance().setConfiguration(configration);
        }
        return FEConfiguration.INSTANCE;
    }

    public setConfiguration(configration: any): void {
        Object.assign(this.configurationContext, configration);
        console.log(this.configurationContext);
    }

    public getUrl(key: string): string {
        return this.configurationContext[key];
    }

    public get(key: string): any {
        return this.configurationContext[key];
    }
}

export function getConfiguration(key: string): any {
    return FEConfiguration.getInstance().get(key);
}

export function setConfiguration(configuration: any): FEConfiguration {
    const configrationInstance: FEConfiguration = FEConfiguration.getInstance();
    configrationInstance.setConfiguration(configuration);
    return configrationInstance;
}

export function commonHttpErrorInterceptor(error: AxiosError) {
    if (error.response && error.response.status) {
        switch (error.response.status) {
            case 401:
                // TODO: 로그인 페이지 처리 event dispatch
                dispatchEvent(
                    new CustomEvent(FEErrorController.HTTP_ERROR_EVENT, {
                        detail: {
                            error,
                            code: 401,
                            message: 'not logined',
                        },
                    })
                );
                return new Promise(() => {});
            case 500:
                // TODO: 500 에러 처리 event dispatch
                dispatchEvent(
                    new CustomEvent(FEErrorController.HTTP_ERROR_EVENT, {
                        detail: {
                            error,
                            code: 500,
                            message: 'interal server error!!!',
                        },
                    })
                );
                return new Promise(() => {});
            default:
                return Promise.reject(error);
        }
    }
    return Promise.reject(error);
}

export function initialization(configuration: any): void {
    const errorController = FEErrorController.getInstance();
    errorController.eventBind();
    setConfiguration(configuration);
    FEAxiosInstance.getInstance();
    setReponseErrorInterceptor(commonHttpErrorInterceptor);
    setResponseInterceptor(commonUserCustomErrorInterceptor);
}

export function setToken(value: string) {
    const axios = FEAxiosInstance.getInstance();
    // axios.defaults.withCredentials = true;
    if (value) {
        axios.defaults.headers.common['Authorization'] = value;
    }
}

export function setRequestHeader(key: string, value: string) {
    const axios = FEAxiosInstance.getInstance();
    // axios.defaults.withCredentials = true;
    if (value) {
        axios.defaults.headers.common[key] = value;
    }
}

export const ErrorController: FEErrorController = FEErrorController.getInstance();

export const AxiosInstance: FEAxiosInstance = FEAxiosInstance.getInstance();

export { type FEErrorEvent } from './error';
export { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError };

