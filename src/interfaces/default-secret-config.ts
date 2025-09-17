export interface CS571DefaultSecretConfig {
    readonly X_CS571_SECRET: string;
    readonly AUTH_HOST: string;
    readonly LOKI_HOST?: string;
    readonly LOKI_USER?: string;
    readonly LOKI_PASS?: string;
}