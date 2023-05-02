import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserPage() {
    return {
      user: {
        age: 12,
        name: 'hansu',
        height: 180,
        paper: true,
      },
    };
  }

  async register(email: string, password: string) {
    const user = await this.userRepository.save({
      email: email,
      password: password,
    });

    return user;
  }
}
