import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { FilesRepository } from "./files.repository";
import { ProductsModule } from "../products/products.module";
import { CloudinaryConfig } from "src/config/cloudinary";

@Module({
    imports: [ProductsModule],
    providers: [CloudinaryConfig, FilesService, FilesRepository],
    controllers: [FilesController]
})
export class FilesModule{}