import { Controller, Get, Query } from '@nestjs/common';
import { UserService, SafeUser } from './user.service';
import { RoleFilterDto } from './dto/role-filter.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() role: RoleFilterDto): Promise<SafeUser[]> {
    return this.userService.findAll(role);
  }
}
