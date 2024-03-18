import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const users = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Doe',
  },
];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    users.push({ ...createUserDto, id: users.length + 1 });
    return createUserDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
