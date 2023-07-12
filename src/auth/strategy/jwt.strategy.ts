/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { jwtConstants } from 'src/const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User.name) private userRepository: Model<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(jwtConstants.secret),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository
      .findOne({
        id: 'dXVvmsrNQOJFVa_KEl39_',
      })
      .exec();
    console.log(user);
    if (user) {
      return {
        email: payload.email.toLowerCase(),
        id: payload.sub,
        username: payload.username,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  
}
