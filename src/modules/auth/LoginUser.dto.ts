import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class LoginUserDto{
    /**
     * Debe ser un email válido y que ya haya sido creado anteriormente
     * @example nombre@dominio.com
     */
    @IsNotEmpty()
    @IsEmail()
    email: string

    /**
     * La contraseña debe coincidir con la contraseña que tenga el usuario con el email
     * @example Contra12@#.123
     */
    @IsNotEmpty()
    @Length(8,15)
    password: string
}