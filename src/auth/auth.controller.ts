import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  signup(@Body() newUser: RegisterUserDto) {
    console.log(newUser);
    return this.authService.createUser(newUser);
  }
  @Public()
  @Post('/login')
  async login(@Res() res, @Body() user: LoginUserDto) {
    console.log(user);
    const response = await this.authService.loginUser(user);
    res.status(HttpStatus.OK).json({
      response,
      message: 'User logged Successfully!',
      statusCode: 201,
    });
  }
}
