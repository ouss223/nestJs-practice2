import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const SECRET = 'change-this-secret';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request & { userId?: any }, res: Response, next: NextFunction) {
    const token = req.header('auth-user');
    if (!token) {
      return res.status(403).json({ message: 'Token missing' });
    }

    try {
      const decoded = verify(token, SECRET) as any;
      if (!decoded || !decoded.userId) {
        return res.status(403).json({ message: 'Token invalid or missing userId' });
      }
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Token invalid' });
    }
  }
}
