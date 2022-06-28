import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import type { Todo } from './entities/todo.entity'
import type { CreateTodoDto } from './dto/create-todo.dto'
import type { UpdateTodoDto } from './dto/update-todo.dto'

@Injectable()
export class TodosService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const [id] = await this.knex<Todo>('todos').insert(createTodoDto)
    return this.findOne(id)
  }

  async findAll() {
    const todos = await this.knex<Todo>('todos')
    return todos
  }

  async findOne(id: number) {
    const todo = await this.knex<Todo>('todos').where({ id }).first()
    if (!todo)
      throw new NotFoundException()

    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.knex<Todo>('todos').where({ id }).update(updateTodoDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.knex<Todo>('todos').where({ id }).del()
  }
}
