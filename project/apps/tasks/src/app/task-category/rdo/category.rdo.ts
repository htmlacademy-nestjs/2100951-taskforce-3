import { Expose } from 'class-transformer';

export class CategoryRdo {
  @Expose()
  public categoryId: number;

  @Expose()
  public title: string;
}