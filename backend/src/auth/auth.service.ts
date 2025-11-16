import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  private getAccessToken(userId: string) {
    const payload = { sub: userId };
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '15m';
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  private getRefreshToken(userId: string) {
    const payload = { sub: userId };
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d';
    // Use same jwtService to sign but pass refresh secret explicitly
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.getAccessToken(user._id.toString());
    const refreshToken = this.getRefreshToken(user._id.toString());

    // Store refresh token with user (rotate on login)
    try {
      await this.userService.setRefreshToken(user._id.toString(), refreshToken);
    } catch (err) {
      throw new HttpException('Could not set refresh token', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }

  async refreshTokens(oldRefreshToken: string) {
    try {
      const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
      const payload = this.jwtService.verify(oldRefreshToken, { secret: refreshSecret }) as any;
      const userId = payload.sub as string;

      const user = await this.userService.findById(userId);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check stored refresh token matches provided one
      if (user.refreshToken !== oldRefreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // All good: create new tokens (rotate refresh token)
      const accessToken = this.getAccessToken(userId);
      const refreshToken = this.getRefreshToken(userId);

      await this.userService.setRefreshToken(userId, refreshToken);

      return { accessToken, refreshToken };
    } catch (err) {
      throw new UnauthorizedException('Could not refresh tokens');
    }
  }

  async logout(refreshToken: string) {
    try {
      const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
      const payload = this.jwtService.verify(refreshToken, { secret: refreshSecret }) as any;
      const userId = payload.sub as string;
      await this.userService.removeRefreshToken(userId);
      return { success: true };
    } catch (err) {
      // If token invalid, still respond success to avoid token fishing
      return { success: true };
    }
  }
}
