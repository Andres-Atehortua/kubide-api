import { PipeTransform, BadRequestException } from '@nestjs/common';

export class FavoriteValidationPipe implements PipeTransform {
  readonly allowedFavorites = ['true', 'false'];
  transform(value: string): string {
    if (!this.isValidFavorite(value))
      throw new BadRequestException(`${value} is not a valid favorite`);
    return value;
  }
  private isValidFavorite(favorite: any): boolean {
    return this.allowedFavorites.indexOf(favorite) !== -1;
  }
}
