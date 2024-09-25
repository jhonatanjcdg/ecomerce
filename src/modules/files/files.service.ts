import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream'
import { FilesRepository } from "./files.repository";
import { UUID } from "crypto";

@Injectable()
export class FilesService{
    constructor(
        private readonly filesRepository: FilesRepository
    ){}

    async uploadImage(file: Express.Multer.File, id: UUID){
        return await this.filesRepository.uploadImage(file, id)
    }
}