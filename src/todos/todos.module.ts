import type { Knex } from 'knex'
import { Module } from '@nestjs/common'
import { KnexModule } from 'nestjs-knex'
import * as KnexEnviroments from '../../knexfile'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'

const knexConfig: Knex.Config = KnexEnviroments[process.env.NODE_ENV]

@Module({
  imports: [
    KnexModule.forRoot({
      config: knexConfig,
    }),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
