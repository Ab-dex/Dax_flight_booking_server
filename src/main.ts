import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
    prefix: 'api/v'
   })
  const config = new DocumentBuilder()
    .setTitle("Dax_Web Admin")
    .setDescription("Just testing, I will change this")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  
  
  // await app.init()
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
