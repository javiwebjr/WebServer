import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Dame Culo", completedAt: new Date() },
  { id: 2, text: "Dame Piernas", completedAt: null },
  { id: 3, text: "Dame Mamadas", completedAt: new Date() },
  { id: 4, text: "Dame Tetas", completedAt: new Date() },
];

export class TodosController {

  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req:Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id)) return res.status(400).json({error: 'ID argument is invalid'});
    const todo = todos.find(todo => todo.id === id);

    (todo)
      ? res.json(todo)
      : res.status(404).json({error: `TODO with Id ${id} not Found`})
  }

  public createTodo = (req: Request, res: Response) => {
    const {text} = req.body;

    if(!text) return res.status(400).json({error: 'Text property is required'});

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null
    }

    todos.push(newTodo);

    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if( isNaN(id)) return res.status(400).json({error: 'ID argument is invalid'});
    
    const todo = todos.find(todo => todo.id === id);

    if(!todo) return res.status(404).json({error: `Todo with ID ${id} not found`});

    const {text, completedAt} = req.body;

    //*Si se requiere un campo valido
    // if(!text) return res.status(400).json({error: 'Text property is required'});

    todo.text = text || todo.text;
    ( completedAt === 'null' )
      ? todo.completedAt = null
      : todo.completedAt = new Date(completedAt || todo.completedAt);
    //! Referencia al todo

    res.json(todo);

  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find(todo => todo.id === id);

    if(!todo) return res.status(404).json({error: `Todo with ID ${id} not found`});

    todos.splice(todos.indexOf(todo), 1);
    res.json(todo);
  }

}
