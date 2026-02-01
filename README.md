# NestJS Shopping List API with MongoDB

A NestJS API for managing shopping lists with tasks, stored in MongoDB Atlas (free tier).

## Features

- ✅ MongoDB Atlas integration
- ✅ Shopping List management with CRUD operations
- ✅ Task management within shopping lists
- ✅ Each shopping list has: name, date, completed status, and tasks
- ✅ Auto-seeding from JSON file
- ✅ Environment configuration
- ✅ TypeScript support

## Data Model

### Shopping List
- `name` (string) - Name of the shopping list
- `date` (Date) - Date of the shopping list
- `completed` (boolean) - Whether the shopping list is completed
- `tasks` (array) - Array of tasks within the shopping list

### Task
- `id` (number) - Unique task identifier
- `title` (string) - Task description
- `completed` (boolean) - Whether the task is completed

## Prerequisites

- Node.js installed
- MongoDB Atlas account (free tier)

## Setup MongoDB Atlas

Follow the instructions in the original setup section (same as before) to create your MongoDB Atlas cluster and get your connection string.

## Installation

```bash
npm install
```

## Configuration

Update the `.env` file with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/nest-api?retryWrites=true&w=majority
PORT=3000
```

## Running the App

```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Shopping Lists

#### Get All Shopping Lists
```bash
GET /api/shopping-lists
```
Returns all shopping lists with their tasks.

**Example Response:**
```json
[
  {
    "_id": "65abc123...",
    "name": "Weekly Groceries",
    "date": "2026-01-27T00:00:00.000Z",
    "completed": false,
    "tasks": [
      {
        "id": 1,
        "title": "Buy milk",
        "completed": false
      }
    ]
  }
]
```

#### Get Single Shopping List
```bash
GET /api/shopping-lists/:id
```
Returns a specific shopping list by ID.

#### Create Shopping List
```bash
POST /api/shopping-lists
Content-Type: application/json

{
  "name": "Weekend Shopping",
  "date": "2026-01-28",
  "completed": false,
  "tasks": [
    {
      "id": 1,
      "title": "Buy vegetables",
      "completed": false
    }
  ]
}
```

#### Update Shopping List
```bash
PATCH /api/shopping-lists/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "completed": true
}
```

#### Delete Shopping List
```bash
DELETE /api/shopping-lists/:id
```

### Tasks (within a Shopping List)

#### Get All Tasks from a Shopping List
```bash
GET /api/shopping-lists/:id/tasks
```

#### Add Task to Shopping List
```bash
POST /api/shopping-lists/:id/tasks
Content-Type: application/json

{
  "id": 4,
  "title": "Buy apples",
  "completed": false
}
```

#### Update Task in Shopping List
```bash
PATCH /api/shopping-lists/:id/tasks/:taskId
Content-Type: application/json

{
  "title": "Buy red apples",
  "completed": true
}
```

#### Delete Task from Shopping List
```bash
DELETE /api/shopping-lists/:id/tasks/:taskId
```

## Testing with curl

```bash
# Get all shopping lists
curl http://localhost:3000/api/shopping-lists

# Get a specific shopping list (replace with actual ID)
curl http://localhost:3000/api/shopping-lists/65abc123...

# Create a new shopping list
curl -X POST http://localhost:3000/api/shopping-lists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Weekend Shopping",
    "date": "2026-01-28",
    "completed": false,
    "tasks": [
      {"id": 1, "title": "Buy vegetables", "completed": false}
    ]
  }'

# Update a shopping list (mark as completed)
curl -X PATCH http://localhost:3000/api/shopping-lists/65abc123... \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Add a task to a shopping list
curl -X POST http://localhost:3000/api/shopping-lists/65abc123.../tasks \
  -H "Content-Type: application/json" \
  -d '{"id": 2, "title": "Buy fruits", "completed": false}'

# Update a task
curl -X PATCH http://localhost:3000/api/shopping-lists/65abc123.../tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3000/api/shopping-lists/65abc123.../tasks/1
```

## Project Structure

```
nest-api/
├── data/
│   ├── tasks.json              # Legacy data for initial seeding
│   └── shopping-lists.json     # Example shopping lists format
├── src/
│   ├── schemas/
│   │   └── shopping-list.schema.ts  # ShoppingList MongoDB schema
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Main module with MongoDB config
│   ├── app.controller.ts       # API endpoints
│   └── app.service.ts          # Business logic & DB operations
├── .env                        # Environment variables (MongoDB URI)
├── .env.example                # Template for environment variables
├── package.json
└── tsconfig.json
```

## How It Works

1. **Shopping Lists** are the main entities, each containing:
   - Name, date, and completed status
   - An array of tasks
   
2. **Tasks** are embedded within shopping lists, making it easy to:
   - Retrieve all tasks for a specific shopping list
   - Update tasks within their shopping list context
   - Keep related data together

3. **On startup**, the app seeds the database from `tasks.json` if empty, converting it to the new shopping list format

## Next Steps

- Add user authentication
- Add input validation with class-validator
- Add pagination for shopping lists
- Add filtering and sorting
- Create a frontend application
- Add due date reminders
