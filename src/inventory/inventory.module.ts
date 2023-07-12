import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from 'src/schemas/inventory.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/const';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },

    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1y' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],

  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
