import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
    title: string

  @IsOptional()
  @IsBoolean()
    complete: boolean
}
