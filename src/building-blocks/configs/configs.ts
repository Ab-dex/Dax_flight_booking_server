import { registerAs } from "@nestjs/config"


enum ConfigKey {
    Db_Config = "DB",
    App_Config = "APP"
}

export enum Environments {
    Development = "development",
    Staging = "staging"
}

const dbConfig = registerAs(
    ConfigKey.Db_Config, () => ({
        env: Environments[process.env.NODE_ENV as keyof typeof Environments] || "development",
        port: parseInt(process.env.PORT) || 5000
    })
)
const appConfig = registerAs(
    ConfigKey.App_Config, () => ({
        env: Environments[process.env.NODE_ENV as keyof typeof Environments] || "development",
        port: parseInt(process.env.DB_PORT) || 240172
    })
)

export const configurations = [dbConfig, appConfig]