import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderDto } from './dto/order.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @UseGuards(AuthGuard)
  //@Public()
  @Post()
  createSale(@Body() newOrder: OrderDto, @Res() res) {
    const response = this.salesService.createOrder(newOrder);
    res.status(HttpStatus.OK).json({
      response,
      message: 'Orden procesada',
      statusCode: 201,
    });
  }

  @UseGuards(AuthGuard)
  //@Public()
  @Get('/:owner')
  async getSales(@Res() res, @Param('owner') owner: string) {
    const response = await this.salesService.getOrders(owner);
    res.status(HttpStatus.OK).json({
      response,
      message: 'Ordenes encontradas',
      statusCode: 201,
    });
  }
}
