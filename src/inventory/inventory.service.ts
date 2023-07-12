import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from 'src/schemas/inventory.schema';
import { Product } from 'src/schemas/product.schema';
import { CategoryDto, InventoryDto, ProductDto } from './dto/inventory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createInventory(inventory: InventoryDto): Promise<any> {
    const created = new this.inventoryModel(inventory);
    return created.save();
  }

  async getInventories(owner: any): Promise<any> {
    const inventoryFound = await this.inventoryModel
      .find({ owner: owner })
      .exec();

    return inventoryFound;
  }

  async createProduct(product: ProductDto): Promise<any> {
    console.log('estamos akiiiiii');
    console.log(product)
    const created = new this.productModel(product);
    return created.save();
  }

  async updateProduct(product: ProductDto): Promise<any> {
    const productFound = await this.productModel
      .findOneAndUpdate({
        id: product.id,
        price: product.price,
        cost: product.cost,
        name: product.name,
        category: product.category,
        unity: product.unity,
        quantity: product.quantity,
        code: product.code,
        imageUrl: product.imageUrl,
      })
      .exec();
    return productFound;
  }

  async uploadFile(file: any): Promise<any> {
    FileInterceptor(file, {
      storage: diskStorage({
        destination: './public',
        filename: function (req, file, cb) {
          console.log(file);
          cb(null, Date.now() + '.png');
        },
      }),
    });
  }

  async createCategory(category: CategoryDto): Promise<any> {
    const created = new this.categoryModel(category);
    return created.save();
  }

  async getCategories(owner: any): Promise<any> {
    const categoryFound = await this.categoryModel
      .find({ owner: owner })
      .exec();

    return categoryFound;
  }

  async getProducts(owner: any): Promise<any> {
    const productFound = await this.productModel
      .find({ inventory: owner })
      .exec();

    return productFound;
  }

  async getProductsByCategory(owner: any, category: any): Promise<any> {
    const productFound = await this.productModel
      .find({ category: category })
      .exec();

    return productFound;
  }

  async getProductsById(id: any): Promise<any> {
    const productFound = await this.productModel.find({ id: id }).exec();

    return productFound;
  }
}
