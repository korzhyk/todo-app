import { Injectable } from '@nestjs/common'
import type { CreateTodoDto } from './dto/create-todo.dto'
import type { UpdateTodoDto } from './dto/update-todo.dto'

@Injectable()
export class TodosService {
  create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo'
  }

  findAll() {
    return 'This action returns all todos'
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`
  }

  remove(id: number) {
    return `This action removes a #${id} todo`
  }
}
