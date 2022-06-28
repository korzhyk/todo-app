import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

if (!process.env.NODE_ENV)
  throw new Error('No NODE_ENV variable provided')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(+process.env.PORT || 3000)
}
bootstrap()
