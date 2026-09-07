import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos';
import { JwtGuard } from './guards';

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
  getAuthUser(@Request() req: Express.Request) {
    const user = req.user as {
      userId: string;
      email: string;
      tenantId: string;
    };

    return this.authService.getAuthUser(user.userId);
  }
}
