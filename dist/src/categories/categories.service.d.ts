import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from "src/prisma/prisma.service";
export declare class CategoriesService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    createcategory(dto: CreateCategoryDto): Promise<import(".prisma/client").Category>;
    getAllCategories(): Promise<import(".prisma/client").Category[]>;
    findOne(id: number): string;
    remove(id: number): string;
    editcategoryById(id: number, dto: CreateCategoryDto, req: Request, res: Response): Promise<void>;
    deletecategoryById(id: number, req: Request, res: Response): Promise<void>;
}
