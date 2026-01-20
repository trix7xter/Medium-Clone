import { JWT_SECRET } from '@app/config';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = undefined;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET);
      const payload: JwtPayload | null =
        typeof decode === 'string' ? null : decode;
      if (!payload?.id) {
        req.user = undefined;
        next();
        return;
      }

      const user = await this.userService.findById(Number(payload.id));
      req.user = user ?? undefined;
      next();
    } catch (err) {
      req.user = undefined;
      next();
    }
  }
}
