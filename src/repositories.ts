import { QueryResult } from "pg";
import { connection } from "./database.js";
import { GetResponse, RequestBody } from "./protocols.js";

export function findDepartaments(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM departaments WHERE id=$1", [id]);
}

export function findPositions(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM positions WHERE id=$1", [id]);
}

export function findEmployeeByEmail(email: string): Promise<QueryResult> {
  return connection.query("SELECT * FROM employees WHERE email=$1", [email]);
}
export function findEmployees(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM employees WHERE id=$1", [id]);
}

export function selectAll(): Promise<QueryResult<GetResponse>> {
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

export function insertNewEmployee(body: RequestBody): Promise<QueryResult> {
  const { name, email, position_id, departament_id } = body;
  return connection.query(
    "INSERT INTO employees (name, email, position_id, departament_id) VALUES ($1,$2,$3,$4)",
    [name, email, position_id, departament_id]
  );
}
