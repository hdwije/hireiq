import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos';
import { JwtGuard } from './guards';
import { CurrentUser } from '../common/decorators';
import type { AuthUser } from '../common/types';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.authService.signin(dto);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: 'Logged in' };
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Logged out' };
  }

  @Get('user')
  @UseGuards(JwtGuard)
  getAuthUser(@CurrentUser() authUser: AuthUser) {
    return this.authService.getAuthUser(authUser.userId);
  }
}
