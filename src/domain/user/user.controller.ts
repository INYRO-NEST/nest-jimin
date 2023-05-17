import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user-page')
  async getUserPage() {
    const res = await this.userService.getUserPage();
    return res;
  }

  // HTTP GET, POST
  @Post()
  async register(@Body() body) {
    console.log('body : ', body);

    const email = body.email;
    const password = body.password;

    const user = await this.userService.register(email, password);

    return user;
  }
}
