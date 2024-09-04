import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';
import { ProblemDocument } from 'http-problem-details';
import { ValidationError } from 'joi';
import ApplicationException from '../types/exeptions/application.exception';
import { serializeObject } from '../utils/serilization';

@Catch()
export class ErrorHandlersFilter implements ExceptionFilter {
  public catch(err: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (err instanceof ApplicationException) {
      const error = new ProblemDocument({
        type: ApplicationException.name,
        title: err.message,
        status: err.statusCode
      });

      response.status(HttpStatus.BAD_REQUEST).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    if (err instanceof BadRequestException) {
      const error = new ProblemDocument({
        type: BadRequestException.name,
        title: err.message,
        status: err.getStatus()
      });

      response.status(HttpStatus.BAD_REQUEST).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    if (err instanceof UnauthorizedException) {
      const error = new ProblemDocument({
        type: UnauthorizedException.name,
        title: err.message,
        status: err.getStatus()
      });
      response.status(HttpStatus.UNAUTHORIZED).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    if (err instanceof ForbiddenException) {
      const error = new ProblemDocument({
        type: ForbiddenException.name,
        title: err.message,
        status: err.getStatus()
      });

      response.status(HttpStatus.FORBIDDEN).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    if (err instanceof NotFoundException) {
      const error = new ProblemDocument({
        type: NotFoundException.name,
        title: err.message,
        status: err.getStatus()
      });

      response.status(HttpStatus.NOT_FOUND).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    if (err instanceof ConflictException) {
      const error = new ProblemDocument({
        type: ConflictException.name,
        title: err.message,
        status: err.getStatus()
      });

      response.status(HttpStatus.CONFLICT).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    if (err instanceof HttpException) {
      const error = new ProblemDocument({
        type: HttpException.name,
        title: err.message,
        status: err.getStatus()
      });

      response.status(HttpStatus.CONFLICT).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    if (err instanceof ValidationError) {
      const error = new ProblemDocument({
        type: ValidationError.name,
        title: err.message,
        status: HttpStatus.BAD_REQUEST
      });

      response.status(HttpStatus.BAD_REQUEST).json(error);

      Logger.error(serializeObject(error));

      return;
    }

    const error = new ProblemDocument({
      type: 'INTERNAL_SERVER_ERROR',
      title: err.message,
      status: err.statusCode || 500
    });

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);

    Logger.error(serializeObject(error));

    return;
  }
}
