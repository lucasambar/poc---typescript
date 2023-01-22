import { Request, Response, NextFunction } from "express";
import { RequestBody } from "./protocols.js";
import {
  findDepartaments,
  findEmployees,
  findPositions,
} from "./repositories.js";
import { employeeSchema } from "./schemas.js";

export async function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as RequestBody;

  const validation = employeeSchema.validate(body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }

  try {
    const { departament_id, position_id } = body;

    const departamentDB = await findDepartaments(departament_id);
    if (departamentDB.rowCount === 0)
      return res.status(404).send("Department not found in database.");

    const positionDB = await findPositions(position_id);
    if (positionDB.rowCount === 0)
      return res.status(404).send("Position not found in database.");

    res.locals = { body };
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function validateEmployeeId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const { rowCount } = await findEmployees(Number(id));
    if (rowCount === 0)
      return res.status(404).send("Employee not found in database.");

    next();
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}
