import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ description: 'The unique identifier of the task', example: 1 })
  id: number;

  @ApiProperty({ description: 'The title of the task', example: 'Buy milk' })
  title: string;

  @ApiProperty({ description: 'Whether the task is completed', example: false })
  completed: boolean;
}

export class CreateShoppingListDto {
  @ApiProperty({ description: 'The name of the shopping list', example: 'Weekly Groceries' })
  name: string;

  @ApiPropertyOptional({ description: 'The date of the shopping list', example: '2026-02-08T10:00:00.000Z' })
  date?: Date;

  @ApiPropertyOptional({ description: 'Whether the shopping list is completed', example: false })
  completed?: boolean;

  @ApiPropertyOptional({ type: [TaskDto], description: 'List of tasks' })
  tasks?: TaskDto[];
}

export class UpdateShoppingListDto {
  @ApiPropertyOptional({ description: 'The name of the shopping list', example: 'Weekly Groceries' })
  name?: string;

  @ApiPropertyOptional({ description: 'The date of the shopping list', example: '2026-02-08T10:00:00.000Z' })
  date?: Date;

  @ApiPropertyOptional({ description: 'Whether the shopping list is completed', example: false })
  completed?: boolean;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'The title of the task', example: 'Buy milk' })
  title?: string;

  @ApiPropertyOptional({ description: 'Whether the task is completed', example: false })
  completed?: boolean;
}
