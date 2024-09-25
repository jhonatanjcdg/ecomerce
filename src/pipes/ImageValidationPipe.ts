import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ImageValidationPipe implements PipeTransform{
    transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
        console.log(file)
        if(!file.buffer)
            throw new BadRequestException('No file provided')
        const maxSize = 200*1024
        if(file.size >= maxSize){
            throw new BadRequestException('File size exceeds the limit of 200kb')
        }
        const fileType = /\.(jpg|jpeg|png|webp)$/i
        if(!file.originalname.match(fileType)){
            throw new BadRequestException('Invalid file type')
        }
        
        return file
    }
}