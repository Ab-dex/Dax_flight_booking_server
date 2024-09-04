import { plainToInstance } from "class-transformer"
import { Environments } from "./configs"
import { IsDefined, IsEnum, IsNumber, validateSync } from "class-validator"

class EnvironmentVariables {
    @IsDefined()
    @IsEnum(Environments)
    NODE_ENV: Environments

    @IsDefined()
    @IsNumber()
    PORT: Number
}
export const validateConfig = (configuration: Record<string, unknown>) => {
    const finalConfig = plainToInstance(EnvironmentVariables, configuration, {
        enableImplicitConversion: true
    })

    const errors = validateSync(finalConfig, { skipMissingProperties: false });

    if (errors?.length) {
        throw new Error ("Please resolve missing environment variables to proceed")
    }
    
    return finalConfig
}