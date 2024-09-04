export declare enum Environments {
    Development = "development",
    Staging = "staging"
}
export declare const configurations: ((() => {
    env: string;
    port: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    env: string;
    port: number;
}>)[];
