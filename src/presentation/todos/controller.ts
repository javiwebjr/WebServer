import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  };

  public getTodoById = async (req:Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id) ) return res.status(400).json({error: 'ID argument is invalid'});

    const todo = await prisma.todo.findFirst({
      where: {id}
    });

    (todo)
      ? res.json(todo)
      : res.status(404).json({error: `TODO with Id ${id} not Found`})
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) return res.status(400).json({error});

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body, id
    });

    if(error) return res.status(400).json({error});
    
    const todo = await prisma.todo.findFirst({
      where: {id}
    });

    if(!todo) return res.status(404).json({error: `Todo with ID ${id} not found`});

    const updatedTodo = await prisma.todo.update({
      where: {id},
      data: updateTodoDto!.Values,
    });

    //*Si se requiere un campo valido
    // if(!text) return res.status(400).json({error: 'Text property is required'});

    res.json(updateTodoDto);

  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
      where: {id}
    });

    if(!todo) return res.status(404).json({error: `Todo with ID ${id} not found`});

    const deletedTodo = await prisma.todo.delete({
      where: {id},
    });

    (deletedTodo)
      ? res.json(deletedTodo)
      : res.status(400).json({error: `Todo with Id ${id} not Found`});
  }

}
