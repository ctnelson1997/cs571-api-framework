
export class CS571InitOptions {
    public readonly skipAuth: boolean;
    public readonly allowNoAuth: string[];
    public readonly skipCors: boolean;

    private constructor(obj?: any) {
        this.allowNoAuth = obj?.allowNoAuth ?? [];
        this.skipAuth = obj?.skipAuth ?? false;
        this.skipCors = obj?.skipCors ?? false;
    }
}