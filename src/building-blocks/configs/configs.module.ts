import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configs';
import { validateConfig } from './config-validation';

@Module({
    imports: [ConfigModule.forRoot({
        load: [...configurations],
        isGlobal: true,
        validate: validateConfig
  }),]
})
export class ConfigsModule {}
