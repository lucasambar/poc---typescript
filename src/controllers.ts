import { Request, Response } from "express";
import {
  deleteEmployee,
  insertNewEmployee,
  putEmployee,
  selectAll,
} from "./repositories.js";
import { RequestBody } from "./protocols.js";
import { calculateBrCharges } from "./services.js";

export async function get(req: Request, res: Response) {
  try {
    const { rows } = await selectAll();

    const response = rows.map((employee) => {
      const playroll_br = calculateBrCharges(employee.salary);
      const aux = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        department: employee.departament,
        position: employee.position,
        playroll_br,
      };
      return aux;
    });

    res.send(response);
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

export async function put(req: Request, res: Response) {
  const body = res.locals.body as RequestBody;
  const id = res.locals.id as number;

  try {
    await putEmployee(body, id);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteOne(req: Request, res: Response) {
  const id = res.locals.id;

  try {
    await deleteEmployee(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
