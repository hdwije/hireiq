import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos';
import { JwtGuard } from './guards';
import type { AuthUser } from './types';
import { CurrentUser } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Get('user')
  @UseGuards(JwtGuard)
  getAuthUser(@CurrentUser() authUser: AuthUser) {
    return this.authService.getAuthUser(authUser.userId);
  }
}
