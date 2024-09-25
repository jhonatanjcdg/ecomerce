import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    /**
     * El nombre no debe estar vacío
     * @example nombre_cualquiera
     */
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string

    /**
     * Debe ser un email valido
     * @example  nombre@dominio.com
     */
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    /**
     * La contraseña debe ser mayor a 8 caracteres y debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*
     * @example Contra12@#.123
     */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,{
        message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
    })
    @IsNotEmpty()
    @Length(8,100)
    password: string

    /**
     * La contraseña debe ser la misma
     * @example Contra12@#.123
     */
    @IsNotEmpty()
    @Length(8,100)
    confirmPassword: string

    /**
     * Asigna por default al momento de creación del usuario, no se debe incluir en el cuerpo de la petición
     * @default false
     */
    @IsEmpty()
    isAdmin: boolean

    /**
     * La dirección debe ser mayor a 3 y menor a 80 carácteres
     * @example calle 2 #5B - 3a
     */
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    address: string

    /**
     * Debe ser  un número entero
     * @example 5123744615123
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number

    /**
     * El país debe ser mayor a 5 y menor a 20 caracteres
     * @example Colombia
     */
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country: string

    /**
     * La ciudad debe ser mayor a 5 y menor a 20 carácteres
     * @example Pasto
     */
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    city: string
}