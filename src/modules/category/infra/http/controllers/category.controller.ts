import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { CategoryGetByIdUseCase } from '../../../core/use-cases/category-get-by-id.use-case'
import type { CategoryListAllUseCase } from '../../../core/use-cases/category-list-all.use-case'
import type { CategoryListAllResponseDto, CategoryResponseDto } from '../dto'
import {
  categoryGetByIdParamsSchema,
  categoryListAllQuerystringSchema,
} from '../schemas/category.schema'
import type { z } from 'zod'

type ListAllCategoriesQuerystring = z.infer<
  typeof categoryListAllQuerystringSchema
>
type GetCategoryByIdParams = z.infer<typeof categoryGetByIdParamsSchema>

interface ListAllCategoriesParams {
  Querystring: ListAllCategoriesQuerystring
}

interface GetCategoryByIdRequestParams {
  Params: GetCategoryByIdParams
}

declare module 'fastify' {
  interface FastifyInstance {
    categoryListAllUseCase: CategoryListAllUseCase
    categoryGetByIdUseCase: CategoryGetByIdUseCase
  }
}

const CategoryController = {
  async listAllCategories(
    this: FastifyInstance,
    request: FastifyRequest<ListAllCategoriesParams>,
    reply: FastifyReply,
  ): Promise<CategoryListAllResponseDto> {
    const { page, limit } = request.query

    const result = await this.categoryListAllUseCase.execute(page, limit)
    return reply.status(200).send(result)
  },

  async getCategoryById(
    this: FastifyInstance,
    request: FastifyRequest<GetCategoryByIdRequestParams>,
    reply: FastifyReply,
  ): Promise<CategoryResponseDto> {
    const { id } = request.params
    const result = await this.categoryGetByIdUseCase.execute(id)
    return reply.status(200).send(result)
  },
}

export default CategoryController
