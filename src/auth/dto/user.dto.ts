export class RegisterUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  bussisnesName: string;
  rif_cedula: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
