import { QueryResult } from "pg";
import { connection } from "./database.js";
import { GetResponse } from "./protocols.js";

export function findDepartaments(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM departaments WHERE id=$1", [id]);
}

export function findPositions(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM positions WHERE id=$1", [id]);
}

export function findEmployees(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM employees WHERE id=$1", [id]);
}

export function selectAll(): Promise<QueryResult<GetResponse>>{
  return connection.query(`
        SELECT
            e.id,
            e.name,
            e.email,
            p.name AS position,
            p.salary,
            d.name AS departament
        FROM employees e
        JOIN positions p ON e.position_id = p.id
        JOIN departaments d ON e.departament_id = d.id
    `);
}
