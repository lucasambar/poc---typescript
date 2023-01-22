import express from "express";
import cors from "cors";

import { validateEmployeeId, validateRequest } from "./middleware.js";
import { get, post } from "./controllers.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => res.send("tudo certo"));

app.get("/employee", get);
app.post("/employee", validateRequest, post);
app.put("/employee/:id", validateEmployeeId, validateRequest);
app.delete("/employee/:id", validateEmployeeId);

app.listen(5000, () => {
  console.log("Projeto rodando na porta 5000. :)");
});
