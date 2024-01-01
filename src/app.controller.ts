import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBasicAuth, ApiBearerAuth, ApiBody, ApiDefaultResponse, ApiFoundResponse, ApiMethodNotAllowedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello-world")
  @ApiOperation({ summary: 'Get Only hello world', description:"Test to see the server runs properly" })
  @ApiBearerAuth("bearer")
  @ApiOkResponse({
      description: "Everything works!"
    })
    @ApiBadRequestResponse({
    description: "Bad Request!",
    })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/auth")
  @ApiOkResponse({
      description: "Success"
    })
  sayHello(): string {
    return this.appService.getHello();
  }
}
