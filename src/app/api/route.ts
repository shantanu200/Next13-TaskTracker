import { NextResponse } from "next/server";
import Todo from "../../../models/Todo";
import { connectDatabase } from "../config/mongo";

interface Todo {
  title: string;
}
export async function GET() {
  try {
    await connectDatabase();
    const todos = await Todo.aggregate([
      {
        $group: {
          _id: "$isCompleted", // Group by the isCompleted field (true or false)
          data: { $push: "$$ROOT" }, // Push documents into the data array
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          completed: {
            $cond: {
              if: { $eq: ["$_id", true] },
              then: "$data",
              else: [],
            },
          },
          notCompleted: {
            $cond: {
              if: { $eq: ["$_id", false] },
              then: "$data",
              else: [],
            },
          },
        },
      },
    ]);

    if (todos) {
      console.log(todos);
      return NextResponse.json({ todos: todos }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Todos not found" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function POST(request: Request) {
  const { title } = await request.json();

  if (!title) {
    return NextResponse.json(
      { message: "Please enter todo title" },
      { status: 400 }
    );
  }

  try {
    await connectDatabase();
    const todo = await Todo.create({
      title,
    });

    if (todo && todo._id) {
      return NextResponse.json(
        { message: "Todo is added", data: todo },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: `Error is occured ${error}` });
  }
}

export async function PUT(request: Request) {
  const { id, title, isCompleted } = await request.json();

  try {
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true }
    );

    if (updateTodo) {
      return NextResponse.json({ message: "Todo is updated" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid Operation is performed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
