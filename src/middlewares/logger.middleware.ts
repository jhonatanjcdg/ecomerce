import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: Error | any) => void) {
        throw new Error("Method not implemented.");
    }
    
}

export function LoggerGlobal(req:Request, res:Response, next: NextFunction){
    const fecha = new Date()
    console.log(`Ruta ${req.url} , método ${req.method} , Fecha ${fecha}`)
    next()
}