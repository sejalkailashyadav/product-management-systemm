import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    userPanel(req: any, res: any): Promise<{
        users: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    createnewUser(dto: CreateCategoryDto): Promise<import(".prisma/client").user>;
    findOne(id: string): string;
    remove(id: string): string;
}
