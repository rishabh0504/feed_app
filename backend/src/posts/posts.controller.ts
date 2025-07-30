import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully.' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'List of posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update post by id' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post by id' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }

  @HttpPost(':id/comments')
  @ApiOperation({ summary: 'Add comment to a post' })
  @ApiParam({ name: 'id', type: Number })
  addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.addComment(id, createCommentDto);
  }

  @HttpPost(':id/like')
  @ApiOperation({ summary: 'Like a post' })
  @ApiParam({ name: 'id', type: Number })
  likePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.likePost(id);
  }

  @HttpPost(':id/dislike')
  @ApiOperation({ summary: 'Dislike a post' })
  @ApiParam({ name: 'id', type: Number })
  dislikePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.dislikePost(id);
  }
}
