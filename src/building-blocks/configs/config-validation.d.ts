import { Environments } from "./configs";
declare class EnvironmentVariables {
    NODE_ENV: Environments;
    PORT: Number;
}
export declare const validateConfig: (configuration: Record<string, unknown>) => EnvironmentVariables;
export {};
