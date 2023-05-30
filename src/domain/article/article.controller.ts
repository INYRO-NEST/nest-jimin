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
import { CreateArticleDto } from './dtos/article/create-article-dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({
    summary: '게시글 작성 API'
  })
  @ApiBody({
    type: CreateArticleDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard) // req.user.id
  @Post()
  async createArticle(@Body() body: CreateArticleDto, @User() user) {
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
