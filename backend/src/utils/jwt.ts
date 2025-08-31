import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { UserDocument } from '../models/user.model';
import { SessionDocument } from '../models/session.model';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';

export type RefreshTokenPayload = {
  sessionId: SessionDocument['_id'];
  iat?: number;
  exp?: number;
};

export type AccessTokenPayload = {
  userId: UserDocument['_id'];
  sessionId: SessionDocument['_id'];
  iat?: number;
  exp?: number;
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ['user'],
  issuer: 'mern-jwt-auth',
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '15m',
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: '30d',
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
): string => {
  try {
    const { secret, ...signOpts } = options || accessTokenSignOptions;
    return jwt.sign(payload, secret, {
      ...defaults,
      ...signOpts,
    });
  } catch (error) {
    throw new Error(`Failed to sign token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const verifyToken = <TPayload extends JwtPayload = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & {
    secret?: string;
  }
): { payload?: TPayload; error?: string } => {
  try {
    const { secret = JWT_SECRET, ...verifyOpts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;
    
    return { payload };
  } catch (error: any) {
    let errorMessage = 'Token verification failed';
    
    if (error.name === 'TokenExpiredError') {
      errorMessage = 'jwt expired';
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token';
    } else if (error.name === 'NotBeforeError') {
      errorMessage = 'Token not active';
    }
    
    return { error: errorMessage };
  }
};

export const decodeToken = <TPayload extends JwtPayload = AccessTokenPayload>(
  token: string
): TPayload | null => {
  try {
    return jwt.decode(token) as TPayload;
  } catch {
    return null;
  }
};
