import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<{
        categories: import(".prisma/client").Category[];
    }>;
    createnewcategory(dto: CreateCategoryDto): Promise<import(".prisma/client").Category>;
    editUser(id: number, dto: CreateCategoryDto, req: any, res: any): Promise<void>;
    deleteUserById(id: number, req: any, res: any): Promise<void>;
}
