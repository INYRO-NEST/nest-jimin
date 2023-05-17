import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtGuard) // req.user.id
  @Post()
  async createArticle(@Body() body, @User() user) {
    const title = body.title;
    const content = body.content;
    const userId = user.id;

    const article = await this.articleService.createArticle(
      title,
      content,
      userId,
    );

    return article;
  }

  @Get('/:id')
  async readArticle(@Param('id') id) {
    const articleId = id;

    const article = await this.articleService.getArticle(articleId);

    return article;
  }
}
