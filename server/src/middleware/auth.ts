import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { JWTPayload, AuthenticatedRequest } from '../types';

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'your-secret-key-change-in-production') as Secret;
const JWT_EXPIRES_IN: SignOptions['expiresIn'] = ('7d') as SignOptions['expiresIn'];

// Generate JWT token
export const generateToken = (payload: JWTPayload): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
  return jwt.sign(payload as object, JWT_SECRET, options);
};

// Verify JWT token middleware
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access token required'
    });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
      return;
    }

    const payload = decoded as JWTPayload;
    req.user = {
      uid: payload.uid,
      evm_address: payload.evm_address,
      publickeyhash: payload.publickeyhash
    };

    next();
  });
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = undefined;
    next();
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      req.user = undefined;
    } else {
      const payload = decoded as JWTPayload;
      req.user = {
        uid: payload.uid,
        evm_address: payload.evm_address,
        publickeyhash: payload.publickeyhash
      };
    }
    next();
  });
};