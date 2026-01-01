import type { FastifyInstance } from 'fastify'
import CategoryController from '../controllers/category.controller'
import {
  categoryGetByIdRouteSchema,
  categoryListAllRouteSchema,
} from '../schemas/category.schema'

declare module 'fastify' {
  interface FastifyInstance {
    categoryController: typeof CategoryController
  }
}

export default async function CategoryRoutes(app: FastifyInstance) {
  app.get('/categories', {
    schema: categoryListAllRouteSchema,
    handler: CategoryController.listAllCategories,
  })

  app.get('/categories/:id', {
    schema: categoryGetByIdRouteSchema,
    handler: CategoryController.getCategoryById,
  })
}
