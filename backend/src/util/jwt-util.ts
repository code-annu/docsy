import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import dotenv from "dotenv";

dotenv.config();

export interface JWTPayload {
  userId: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const ACCESS_TOKEN_EXPIRE = (process.env.JWT_ACCESS_EXPIRES_IN! ||
  "24h") as StringValue;

const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;
const REFRESH_TOKEN_EXPIRE = (process.env.JWT_REFRESH_EXPIRES_IN ||
  "30d") as StringValue;

export const generateAccessToken = (payload: JWTPayload): string =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });

export const generateRefreshToken = (payload: JWTPayload): string =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });

export const generateTokens = (
  payload: JWTPayload
): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
};
