import type { INestApplication } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import type { Todo } from '../src/todos/entities/todo.entity'
import type { CreateTodoDto } from '../src/todos/dto/create-todo.dto'
import type { UpdateTodoDto } from '../src/todos/dto/update-todo.dto'
import { TodosService } from '../src/todos/todos.service'
import { TodosModule } from '../src/todos/todos.module'

describe('Todos', () => {
  let app: INestApplication
  const testTodo = { title: 'Buy milk', complete: false }
  const mockTodos = {
    _counter: 0,
    _todos: [] as Todo[],
    create(createDto: CreateTodoDto) {
      const todo = { ...createDto, id: ++this._counter }
      this._todos.push(todo)
      return todo
    },
    update(id: number, updateDto: UpdateTodoDto) {
      const todo = this.findOne(id)
      if (!todo)
        throw new NotFoundException()
      return Object.assign(todo, updateDto)
    },
    remove(id: number) { this._todos = this._todos.filter(_ => _.id !== id) },
    findOne(id: number) { return this._todos.find(_ => _.id === id) },
    findAll() { return this._todos },
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TodosModule],
    })
      .overrideProvider(TodosService)
      .useValue(mockTodos)
      .compile()

    app = module.createNestApplication()
    await app.init()
  })

  it('/todos (GET)', async () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect(mockTodos.findAll())
  })

  it('/todos (POST)', async () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send(testTodo)
      .expect(201, { id: 1, ...testTodo })
  })

  it('/todos/1 (GET)', async () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .expect(200, { id: 1, ...testTodo })
  })

  it('/todos/1 (PUT)', async () => {
    return request(app.getHttpServer())
      .patch('/todos/1')
      .send({ title: 'Buy coffee' })
      .expect(200, { id: 1, ...testTodo, title: 'Buy coffee' })
  })

  it('/todos/1 (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/todos/1')
      .expect(204)
  })

  afterAll(async () => {
    await app.close()
  })
})
