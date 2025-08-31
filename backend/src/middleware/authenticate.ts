import { RequestHandler } from 'express';
import appAssert from '../utils/appAssert';
import AppErrorCode from '../constants/appErrorCode';
import { UNAUTHORIZED } from '../constants/http';
import { verifyToken } from '../utils/jwt';
import mongoose from 'mongoose';

const authenticate: RequestHandler = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken as string | undefined;
    
    appAssert(
      accessToken,
      UNAUTHORIZED,
      'Access token is required',
      AppErrorCode.InvalidAccessToken
    );

    const { error, payload } = verifyToken(accessToken);
    
    if (error) {
      const message = error === 'jwt expired' ? 'Token expired' : 'Invalid token';
      appAssert(
        false,
        UNAUTHORIZED,
        message,
        AppErrorCode.InvalidAccessToken
      );
    }

    appAssert(
      payload,
      UNAUTHORIZED,
      'Invalid token payload',
      AppErrorCode.InvalidAccessToken
    );

    // Validate ObjectId format before creating
    if (!mongoose.Types.ObjectId.isValid(payload.userId as string)) {
      appAssert(
        false,
        UNAUTHORIZED,
        'Invalid user ID in token',
        AppErrorCode.InvalidAccessToken
      );
    }

    if (!mongoose.Types.ObjectId.isValid(payload.sessionId as string)) {
      appAssert(
        false,
        UNAUTHORIZED,
        'Invalid session ID in token',
        AppErrorCode.InvalidAccessToken
      );
    }

    req.userId = new mongoose.Types.ObjectId(payload.userId as string);
    req.sessionId = new mongoose.Types.ObjectId(payload.sessionId as string);
    
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
