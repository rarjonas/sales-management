import type { FastifyInstance } from 'fastify'
import { CategoryGetByIdUseCase } from './core/use-cases/category-get-by-id.use-case'
import { CategoryListAllUseCase } from './core/use-cases/category-list-all.use-case'
import CategoryController from './infra/http/controllers/category.controller'
import CategoryRoutes from './infra/http/routes/category.routes'
import { CategoryRepository } from './infra/repository/category.repository'

declare module 'fastify' {
  interface FastifyInstance {
    categoryListAllUseCase: CategoryListAllUseCase
    categoryGetByIdUseCase: CategoryGetByIdUseCase
    categoryController: typeof CategoryController
  }
}

/**
 * Orquestra a inicialização do módulo Category
 * - Registra Repository (Infrastructure)
 * - Registra Use Cases (Core/Domain)
 * - Registra Controllers (Infrastructure/Adapters)
 * - Registra Routes (Infrastructure/Adapters)
 */
export default async function CategoryModule(app: FastifyInstance) {
  const categoryRepository = new CategoryRepository()
  const categoryListAllUseCase = new CategoryListAllUseCase(categoryRepository)
  const categoryGetByIdUseCase = new CategoryGetByIdUseCase(categoryRepository)

  app.decorate('categoryListAllUseCase', categoryListAllUseCase)
  app.decorate('categoryGetByIdUseCase', categoryGetByIdUseCase)
  app.decorate('categoryController', CategoryController)

  // registra as rotas do módulo Category
  await app.register(CategoryRoutes)
}

// exporta os use cases usados por outros módulos
export type { CategoryListAllUseCase, CategoryGetByIdUseCase }
