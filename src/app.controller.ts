import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AppService } from "./app.service";
import {
  CreateShoppingListDto,
  UpdateShoppingListDto,
  TaskDto,
  UpdateTaskDto,
} from './dto/shopping-list.dto';

@ApiTags('shopping-lists')
@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Health check endpoint
  @ApiTags('health')
  @Get("health")
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    };
  }

  // Shopping List endpoints
  @Get("shopping-lists")
  @ApiOperation({ summary: 'Get all shopping lists' })
  @ApiResponse({ status: 200, description: 'Returns all shopping lists' })
  async getAllShoppingLists() {
    return this.appService.getAllShoppingLists();
  }

  @Get("shopping-lists/:id")
  @ApiOperation({ summary: 'Get a shopping list by ID' })
  @ApiParam({ name: 'id', description: 'Shopping list ID' })
  @ApiResponse({ status: 200, description: 'Returns the shopping list' })
  @ApiResponse({ status: 404, description: 'Shopping list not found' })
  async getShoppingListById(@Param("id") id: string) {
    return this.appService.getShoppingListById(id);
  }

  @Post("shopping-lists")
  @ApiOperation({ summary: 'Create a new shopping list' })
  @ApiResponse({ status: 201, description: 'Shopping list created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createShoppingList(@Body() data: CreateShoppingListDto) {
    return this.appService.createShoppingList(data);
  }

  @Patch("shopping-lists/:id")
  @ApiOperation({ summary: 'Update a shopping list' })
  @ApiParam({ name: 'id', description: 'Shopping list ID' })
  @ApiResponse({ status: 200, description: 'Shopping list updated successfully' })
  @ApiResponse({ status: 404, description: 'Shopping list not found' })
  async updateShoppingList(
    @Param("id") id: string,
    @Body() updates: UpdateShoppingListDto
  ) {
    return this.appService.updateShoppingList(id, updates);
  }

  @Delete("shopping-lists/:id")
  @ApiOperation({ summary: 'Delete a shopping list' })
  @ApiParam({ name: 'id', description: 'Shopping list ID' })
  @ApiResponse({ status: 200, description: 'Shopping list deleted successfully' })
  @ApiResponse({ status: 404, description: 'Shopping list not found' })
  async deleteShoppingList(@Param("id") id: string) {
    return this.appService.deleteShoppingList(id);
  }

  // Task endpoints (within a shopping list)
  @ApiTags('tasks')
  @Get("shopping-lists/:id/tasks")
  @ApiOperation({ summary: 'Get all tasks from a shopping list' })
  @ApiParam({ name: 'id', description: 'Shopping list ID' })
  @ApiResponse({ status: 200, description: 'Returns all tasks' })
  @ApiResponse({ status: 404, description: 'Shopping list not found' })
  async getTasks(@Param("id") shoppingListId: string) {
    return this.appService.getTasks(shoppingListId);
  }

  @ApiTags('tasks')
  @Post("shopping-lists/:id/tasks")
  @ApiOperation({ summary: 'Add a task to a shopping list' })
  @ApiParam({ name: 'id', description: 'Shopping list ID' })
  @ApiResponse({ status: 201, description: 'Task added successfully' })
  @ApiResponse({ status: 404, description: 'Shopping list not found' })
  async addTask(
    @Param("id") shoppingListId: string,
    @Body() task: TaskDto
  ) {
    return this.appService.addTask(shoppingListId, task);
  }

  @ApiTags('tasks')
  @Patch("shopping-lists/:id/tasks/:taskId")
  @ApiOperation({ summary: 'Update a task in a shopping list' })
  @ApiParam({ name: 'id', description: 'Shopping list ID' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Shopping list or task not found' })
  async updateTask(
    @Param("id") shoppingListId: string,
    @Param("taskId") taskId: string,
    @Body() updates: UpdateTaskDto
  ) {
    return this.appService.updateTask(
      shoppingListId,
      parseInt(taskId),
      updates
    );
  }

  @ApiTags('tasks')
  @Delete("shopping-lists/:id/tasks/:taskId")
  @ApiOperation({ summary: 'Delete a task from a shopping list' })
  @ApiParam({ name: 'id', description: 'Shopping list ID' })
  @ApiParam({ name: 'taskId', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Shopping list or task not found' })
  async deleteTask(
    @Param("id") shoppingListId: string,
    @Param("taskId") taskId: string
  ) {
    return this.appService.deleteTask(shoppingListId, parseInt(taskId));
  }
}
