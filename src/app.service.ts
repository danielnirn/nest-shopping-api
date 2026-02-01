import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ShoppingList,
  ShoppingListDocument,
} from "./schemas/shopping-list.schema";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(ShoppingList.name)
    private shoppingListModel: Model<ShoppingListDocument>,
  ) {}

  async onModuleInit() {
    // Initialize database with data from JSON file if empty
    const count = await this.shoppingListModel.countDocuments();
    if (count === 0) {
      await this.seedDatabase();
    }
  }

  private async seedDatabase() {
    try {
      const dataPath = path.join(__dirname, "..", "data", "tasks.json");
      const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      
      // Convert old format to new shopping list format
      await this.shoppingListModel.create({
        name: data.name,
        date: new Date(),
        completed: false,
        tasks: data.tasks,
      });
      
      console.log("Database seeded with initial data");
    } catch (error) {
      console.error("Error seeding database:", error.message);
    }
  }

  // Get all shopping lists
  async getAllShoppingLists() {
    return this.shoppingListModel.find().exec();
  }

  // Get a single shopping list by ID
  async getShoppingListById(id: string) {
    const shoppingList = await this.shoppingListModel.findById(id).exec();
    if (!shoppingList) {
      throw new Error(`Shopping list with id ${id} not found`);
    }
    return shoppingList;
  }

  // Create a new shopping list
  async createShoppingList(data: {
    name: string;
    date?: Date;
    completed?: boolean;
    tasks?: Array<{ id: number; title: string; completed: boolean }>;
  }) {
    const shoppingList = new this.shoppingListModel({
      name: data.name,
      date: data.date || new Date(),
      completed: data.completed || false,
      tasks: data.tasks || [],
    });
    return shoppingList.save();
  }

  // Update a shopping list
  async updateShoppingList(
    id: string,
    updates: {
      name?: string;
      date?: Date;
      completed?: boolean;
    },
  ) {
    const shoppingList = await this.shoppingListModel.findById(id).exec();
    if (!shoppingList) {
      throw new Error(`Shopping list with id ${id} not found`);
    }

    if (updates.name !== undefined) shoppingList.name = updates.name;
    if (updates.date !== undefined) shoppingList.date = updates.date;
    if (updates.completed !== undefined)
      shoppingList.completed = updates.completed;

    return shoppingList.save();
  }

  // Delete a shopping list
  async deleteShoppingList(id: string) {
    const result = await this.shoppingListModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error(`Shopping list with id ${id} not found`);
    }
    return { message: "Shopping list deleted successfully" };
  }

  // Get all tasks from a shopping list
  async getTasks(shoppingListId: string) {
    const shoppingList = await this.getShoppingListById(shoppingListId);
    return shoppingList.tasks;
  }

  // Add a task to a shopping list
  async addTask(
    shoppingListId: string,
    task: { id: number; title: string; completed: boolean },
  ) {
    const shoppingList = await this.getShoppingListById(shoppingListId);
    shoppingList.tasks.push(task);
    await shoppingList.save();
    return task;
  }

  // Update a task in a shopping list
  async updateTask(
    shoppingListId: string,
    taskId: number,
    updates: { title?: string; completed?: boolean },
  ) {
    const shoppingList = await this.getShoppingListById(shoppingListId);
    const task = shoppingList.tasks.find((t) => t.id === taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    if (updates.title !== undefined) task.title = updates.title;
    if (updates.completed !== undefined) task.completed = updates.completed;

    await shoppingList.save();
    return task;
  }

  // Delete a task from a shopping list
  async deleteTask(shoppingListId: string, taskId: number) {
    const shoppingList = await this.getShoppingListById(shoppingListId);
    const index = shoppingList.tasks.findIndex((t) => t.id === taskId);
    if (index === -1) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    shoppingList.tasks.splice(index, 1);
    await shoppingList.save();
    return { message: "Task deleted successfully" };
  }
}
