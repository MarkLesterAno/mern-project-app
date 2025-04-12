import jwt from 'jsonwebtoken';
import config from '../../config';
/**
 * JWTHelper is a utility class for working with JSON Web Tokens (JWTs).
 */
export default class JWTHelper {
  /**
   * Generates an access token.
   * @param id The user's ID.
   * @returns The access token.
   */

  static generateToken(id: string, type: 'access' | 'refresh' | 'invite' | 'reset') {
    let payload: object;
    let expiresIn: string;

    switch (type) {
      case 'access':
        payload = { id };
        expiresIn = config.TOKEN_ACCESS_EXPIRY;
        break;
      case 'refresh':
        payload = { email: id };
        expiresIn = config.TOKEN_REFRESH_EXPIRY;
        break;
      case 'invite':
        payload = { id };
        expiresIn = config.TOKEN_INVITE_EXPIRY;
        break;
      case 'reset':
        payload = { email: id };
        expiresIn = config.TOKEN_RESET_EXPIRY;
        break;
      default:
        throw new Error('Invalid token type');
    }

    return jwt.sign(payload, config.TOKEN_SECRET as string, { expiresIn });
  }
  static generateAccessToken(id: string) {
    return this.generateToken(id, 'access');
  }

  static generateRefreshToken(email: string) {
    return this.generateToken(email, 'refresh');
  }

  static generateInviteToken(id: string) {
    return this.generateToken(id, 'invite');
  }

  static generateResetToken(email: string) {
    return this.generateToken(email, 'reset');
  }
  static verify(token: string) {
    return jwt.verify(token, config.TOKEN_SECRET as string);
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}