import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
} from 'class-validator';

export class InventoryDto {
  name: string;
  id: string;
  owner: string;
}

export class ProductDto {
  id: string;
  name: string;
  price: number;
  quantity: number;
  cost: number;
  category: string;
  unity: string;
  inventory: string;
  imageUrl: string;
  code: string;
}

export class CategoryDto {
  name: string;
  id: string;
  inventory: string;
}
