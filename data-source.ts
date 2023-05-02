import { DataSource } from 'typeorm';
import * as path from 'path';
import { UserEntity } from './src/entities/user.entity';
import { CommentEntity } from './src/entities/comment.entity';
import { ArticleEntity } from './src/entities/article.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [UserEntity, CommentEntity, ArticleEntity],
  synchronize: false,
  logging: true,
});
