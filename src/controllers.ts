import { Request, Response } from "express";
import { insertNewEmployee, selectAll } from "./repositories.js";
import { RequestBody } from "./protocols.js";

export async function get(req: Request, res: Response) {
  try {
    const { rows } = await selectAll();
    res.send(rows);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function post(req: Request, res: Response) {
  const body = res.locals.body as RequestBody;

  try {
    await insertNewEmployee(body);
    res.send(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
