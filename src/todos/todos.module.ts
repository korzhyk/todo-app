import { Module } from '@nestjs/common'
import { KnexModule } from 'nestjs-knex'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory() {
        return import('../../knexfile').then((knexEnvironments) => {
          return { config: knexEnvironments[process.env.NODE_ENV] }
        })
      },
    }),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
