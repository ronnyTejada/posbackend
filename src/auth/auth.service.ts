import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSchema, User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    public jwtService: JwtService,
  ) {}

  async createUser(createUserDto: RegisterUserDto): Promise<any> {
    const salt = await genSalt(10);
    console.log(createUserDto);
    const data = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (data !== null) {
      return { code: 400, msg: 'Email found' };
    }

    createUserDto.password = await hash(createUserDto.password, salt);

    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async createToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.name,
    };
    return this.jwtService.sign(payload);
  }

  async validatePasswordUser(user: User, password: string): Promise<boolean> {
    const pas = await compare(password, user.password);
    if (pas) {
      return true;
    } else {
      return false;
    }
  }

  async loginUser(user: LoginUserDto): Promise<any> {
    const userFound = await this.userModel
      .findOne({ email: user.email })
      .exec();

    if (userFound) {
      const passwordValid = await this.validatePasswordUser(
        userFound,
        user.password,
      );

      if (passwordValid) {
        const token = await this.createToken(userFound);
        delete userFound.password;
        return { token, userFound };
      } else {
        // throw new UnauthorizedException(`Invalid Password.`);
        return 'Invalid Password';
      }
    } else {
      //throw new UnauthorizedException(`User not found.`);
      return 'User not found';
    }
  }
}
