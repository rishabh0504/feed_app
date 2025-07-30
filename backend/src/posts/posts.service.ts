import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Post, Comment } from '@prisma/client';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto): Promise<Post & { comments: Comment[] }> {
    try {
      const post = await this.prisma.post.create({ data });
      this.logger.log(`Created post with ID ${post.id}`);
      return this.findOne(post.id);
    } catch (error) {
      this.logger.error('Error creating post', error);
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  async findAll(): Promise<(Post & { comments: Comment[] })[]> {
    try {
      return await this.prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { comments: true },
      });
    } catch (error) {
      this.logger.error('Error fetching posts', error);
      throw new InternalServerErrorException('Failed to fetch posts');
    }
  }

  async findOne(id: number): Promise<Post & { comments: Comment[] }> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: { comments: true },
      });
      if (!post) {
        this.logger.warn(`Post with ID ${id} not found`);
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error fetching post with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to fetch post');
    }
  }

  async update(
    id: number,
    data: UpdatePostDto,
  ): Promise<Post & { comments: Comment[] }> {
    try {
      await this.ensurePostExists(id);
      await this.prisma.post.update({ where: { id }, data });
      this.logger.log(`Updated post with ID ${id}`);
      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error updating post with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.ensurePostExists(id);
      await this.prisma.post.delete({ where: { id } });
      this.logger.log(`Deleted post with ID ${id}`);
      return { message: `Post with ID ${id} successfully deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error deleting post with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to delete post');
    }
  }

  async addComment(
    postId: number,
    data: CreateCommentDto,
  ): Promise<Post & { comments: Comment[] }> {
    try {
      await this.ensurePostExists(postId);
      await this.prisma.comment.create({
        data: { ...data, postId },
      });
      this.logger.log(`Added comment to post ID ${postId}`);
      return this.findOne(postId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error adding comment to post ID ${postId}`, error);
      throw new InternalServerErrorException('Failed to add comment');
    }
  }

  async likePost(postId: number): Promise<Post & { comments: Comment[] }> {
    try {
      await this.ensurePostExists(postId);
      await this.prisma.post.update({
        where: { id: postId },
        data: { liked: { increment: 1 } },
      });
      this.logger.log(`Incremented likes for post ID ${postId}`);
      return this.findOne(postId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error liking post ID ${postId}`, error);
      throw new InternalServerErrorException('Failed to like post');
    }
  }

  async dislikePost(postId: number): Promise<Post & { comments: Comment[] }> {
    try {
      await this.ensurePostExists(postId);
      await this.prisma.post.update({
        where: { id: postId },
        data: { disliked: { increment: 1 } },
      });
      this.logger.log(`Incremented dislikes for post ID ${postId}`);
      return this.findOne(postId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error disliking post ID ${postId}`, error);
      throw new InternalServerErrorException('Failed to dislike post');
    }
  }

  private async ensurePostExists(postId: number): Promise<void> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      this.logger.warn(`Post with ID ${postId} not found`);
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
  }
}
