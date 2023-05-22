import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createnewUser(dto: CreateCategoryDto): Promise<import(".prisma/client").user>;
    findOne(id: string): string;
    remove(id: string): string;
}
