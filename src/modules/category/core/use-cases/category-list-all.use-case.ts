import type { CategoryListAllResponseDto } from '../../infra/http/dto'
import type { CategoryRepository } from '../../infra/repository/category.repository'

export class CategoryListAllUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<CategoryListAllResponseDto> {
    const result = await this.categoryRepository.findAll(page, limit)

    const categoriesResponse = result.items.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description ?? '',
      slug: category.slug,
      active: category.active,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    }))

    return {
      data: categoriesResponse,
      metadata: result.metadata,
    }
  }
}
