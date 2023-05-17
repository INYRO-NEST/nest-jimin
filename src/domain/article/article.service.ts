import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  // 게시글 만드는 서비스
  async createArticle(title: string, content: string, userId: string) {
    const article = await this.articleRepository.save({
      content: content,
      title: title,
      userId: userId,
    });

    return article;
  }

  async getArticle(articleId: string) {
    const article = await this.articleRepository.findOne({
      where: {
        id: articleId,
      },
      relations: {
        comments: true,
      },
    });

    return article;
  }
}
