import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageValidationPipe } from "src/pipes/ImageValidationPipe";
import { UUID } from "crypto";
import { Request } from "express";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FilesController{
    constructor(
        private readonly filesService: FilesService
    ){}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage (@UploadedFile(
        new ImageValidationPipe()
    ) file: Express.Multer.File, @Param('id', ParseUUIDPipe) id: UUID){
        return await this.filesService.uploadImage(file, id)
    }
}