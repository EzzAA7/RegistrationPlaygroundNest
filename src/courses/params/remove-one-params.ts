import { IsMongoId } from 'class-validator';

export class RemoveOneParams {
  @IsMongoId()
  id: string;
}
