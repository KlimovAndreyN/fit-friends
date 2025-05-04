import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmailSubscriberDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public name: string;
}
