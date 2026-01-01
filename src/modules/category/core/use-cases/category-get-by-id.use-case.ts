import {
  DatabaseNotFoundException,
  ValidationBusinessException,
} from '@/shared/core/exceptions/database.exception'
import type { CategoryResponseDto } from '../../infra/http/dto/category-response.dto'
import type { CategoryRepository } from '../../infra/repository/category.repository'

export class CategoryGetByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string | undefined): Promise<CategoryResponseDto> {
    if (!id) {
      throw new ValidationBusinessException(
        'Category ID is required',
        'VALIDATION_ERROR',
      )
    }

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new DatabaseNotFoundException('Category not found')
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description ?? '',
      slug: category.slug,
      active: category.active,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    }
  }
}
