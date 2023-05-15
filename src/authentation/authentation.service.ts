import { Injectable } from '@nestjs/common';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class AuthentationService {
    constructor(private readonly prismaService : PrismaService, private readonly hashingservice: HashingService){
        
    }
}
