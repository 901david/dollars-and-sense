import { JwtFromRequestFunction } from 'passport-jwt';

export interface JWTOptions {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
}
