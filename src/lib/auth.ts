import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'Sawariya-secret';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookieToken = req.cookies.get('token')?.value;
  return cookieToken || null;
}

export function authenticateRequest(req: NextRequest): JWTPayload | null {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function requireAdmin(req: NextRequest): JWTPayload | null {
  const user = authenticateRequest(req);
  if (!user || user.role !== 'ADMIN') return null;
  return user;
}
