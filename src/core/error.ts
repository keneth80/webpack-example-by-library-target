export interface FEErrorEvent {
    error: any;
    message: string;
    code: number | string;
}

export class FEErrorController {
    public static HTTP_ERROR_EVENT = 'http_error_event';

    private static INSTANCE: FEErrorController;

    private receivers: Array<(data: FEErrorEvent) => void> = [];

    constructor() {}

    public addEvent(value: (data: FEErrorEvent) => void) {
        this.receivers.push(value);
    }

    public removeEvent(callback: (data: FEErrorEvent) => void) {
        const tempIndex = this.receivers.findIndex((receiver: (data: FEErrorEvent) => void) => receiver === callback);
        if (tempIndex > -1) {
            this.receivers.splice(tempIndex, 1);
        }
    }

    public static getInstance(): FEErrorController {
        if (!FEErrorController.INSTANCE) {
            FEErrorController.INSTANCE = new FEErrorController();
        }
        return FEErrorController.INSTANCE;
    }

    eventBind(): FEErrorController {
        addEventListener(FEErrorController.HTTP_ERROR_EVENT, this.eventExcute as EventListener);
        return FEErrorController.INSTANCE;
    }

    private eventExcute = ({ detail }: CustomEvent): void => {
        for (let i = 0; i < this.receivers.length; i++) {
            this.receivers[i](detail);
        }
    };
}
