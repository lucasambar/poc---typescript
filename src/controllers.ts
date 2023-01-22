import {Request, Response} from "express"
import { selectAll } from "./repositories.js"

export async function get (req: Request, res: Response) {
    try {
        const {rows} = await selectAll() 
        res.send(rows)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}
