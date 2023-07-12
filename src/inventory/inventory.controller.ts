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
  Req,
  UploadedFile,
  UseInterceptors,
  HttpServer,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { CategoryDto, InventoryDto, ProductDto } from './dto/inventory.dto';
import { InventoryService } from './inventory.service';
import { getDollarPrices, getDollarPricesWithAverage } from 'venecodollar';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @UseGuards(AuthGuard)
  //@Public()
  @Post()
  createInventory(@Body() newInventory: InventoryDto) {
    console.log(newInventory);
    return this.inventoryService.createInventory(newInventory);
  }

  @UseGuards(AuthGuard)
  @Post('/get-inventories')
  async getInventory(@Res() res, @Body() owner: any) {
    const response = await this.inventoryService.getInventories(owner.owner);
    res.status(HttpStatus.OK).json({
      response,
      message: 'Inventories found',
      statusCode: 201,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/add-product')
  async createProduct(@Body() newProduct: ProductDto, @Res() res) {
    const response = await this.inventoryService.createProduct(newProduct);
    res.status(HttpStatus.OK).json({
      data: response,
      message: 'Producto agregado',
      statusCode: 201,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/update-product')
  async updateProduct(@Body() newProduct: ProductDto, @Res() res) {
    const response = await this.inventoryService.updateProduct(newProduct);
    res.status(HttpStatus.OK).json({
      data: response,
      message: 'Producto agregado',
      statusCode: 201,
    });
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: function (req, file, cb) {
          console.log(file);
          cb(null, Date.now() + '.png');
        },
      }),
    }),
  )
  //@UseGuards(AuthGuard)
  @Public()
  @Post('/upload-file')
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    res.status(HttpStatus.OK).json({
      url: 'http://localhost:3000/api/v1/inventory/pictures/' + file.filename,
      message: 'File Uploaded',
      statusCode: 201,
    });
  }

  @Public()
  @Get('/pictures/:filename')
  async getImage(@Res() res, @Param() filename: any) {
    res.sendFile(join(__dirname, '../../public', filename.filename));
  }

  @UseGuards(AuthGuard)
  @Post('/get-categories')
  async getCategories(@Res() res, @Body() owner: any) {
    const data = await this.inventoryService.getCategories(owner.owner);
    res.status(HttpStatus.OK).json({
      data,
      message: 'all categories found',
      statusCode: 201,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/get-products')
  async getProducts(@Res() res, @Body() owner: any) {
    console.log(owner);
    const data = await this.inventoryService.getProducts(owner.owner);
    res.status(HttpStatus.OK).json({
      data,
      message: 'all products found',
      statusCode: 201,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/get-products-by-category')
  async getProductsByCategory(
    @Res() res,
    @Body() owner: any,
    @Body() category: any,
  ) {
    const data = await this.inventoryService.getProductsByCategory(
      owner.owner,
      category.category,
    );
    res.status(HttpStatus.OK).json({
      data,
      message: 'all products found',
      statusCode: 201,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/get-product-by-id')
  async getProductsById(@Res() res, @Body() id: any) {
    const data = await this.inventoryService.getProductsById(id.id);
    res.status(HttpStatus.OK).json({
      data,
      message: 'product found',
      statusCode: 201,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/add-category')
  createCategory(@Body() newCategory: CategoryDto) {
    return this.inventoryService.createCategory(newCategory);
  }

  @UseGuards(AuthGuard)
  @Get('/get-dollar-price')
  async getDollar(@Res() res: any) {
    const dolar = await getDollarPrices();
    res.status(HttpStatus.OK).json({
      dolar: dolar[0],
      message: 'dolar bcv',
      statusCode: 201,
    });
    console.log(dolar[0]);

    //return this.inventoryService.createCategory(newCategory);
  }
}
