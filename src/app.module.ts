import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SalesService } from './sales/sales.service';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    InventoryModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://rjt:Hola123-@cluster0.7cvkg5e.mongodb.net/?retryWrites=true&w=majority',
    ),
    SalesModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
