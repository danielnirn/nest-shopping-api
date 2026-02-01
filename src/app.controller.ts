import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Shopping List endpoints
  @Get("shopping-lists")
  async getAllShoppingLists() {
    return this.appService.getAllShoppingLists();
  }

  @Get("shopping-lists/:id")
  async getShoppingListById(@Param("id") id: string) {
    return this.appService.getShoppingListById(id);
  }

  @Post("shopping-lists")
  async createShoppingList(
    @Body()
    data: {
      name: string;
      date?: Date;
      completed?: boolean;
      tasks?: Array<{ id: number; title: string; completed: boolean }>;
    },
  ) {
    return this.appService.createShoppingList(data);
  }

  @Patch("shopping-lists/:id")
  async updateShoppingList(
    @Param("id") id: string,
    @Body() updates: { name?: string; date?: Date; completed?: boolean },
  ) {
    return this.appService.updateShoppingList(id, updates);
  }

  @Delete("shopping-lists/:id")
  async deleteShoppingList(@Param("id") id: string) {
    return this.appService.deleteShoppingList(id);
  }

  // Task endpoints (within a shopping list)
  @Get("shopping-lists/:id/tasks")
  async getTasks(@Param("id") shoppingListId: string) {
    return this.appService.getTasks(shoppingListId);
  }

  @Post("shopping-lists/:id/tasks")
  async addTask(
    @Param("id") shoppingListId: string,
    @Body() task: { id: number; title: string; completed: boolean },
  ) {
    return this.appService.addTask(shoppingListId, task);
  }

  @Patch("shopping-lists/:id/tasks/:taskId")
  async updateTask(
    @Param("id") shoppingListId: string,
    @Param("taskId") taskId: string,
    @Body() updates: { title?: string; completed?: boolean },
  ) {
    return this.appService.updateTask(shoppingListId, parseInt(taskId), updates);
  }

  @Delete("shopping-lists/:id/tasks/:taskId")
  async deleteTask(
    @Param("id") shoppingListId: string,
    @Param("taskId") taskId: string,
  ) {
    return this.appService.deleteTask(shoppingListId, parseInt(taskId));
  }
}
