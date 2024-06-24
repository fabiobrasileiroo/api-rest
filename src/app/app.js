import express from "express";
import SelecaoController from "./controllers/SelecaoController.js";

const app = express();

app.use(express.json());

// Routers
app.get("/table", SelecaoController.table);
app.get("/", SelecaoController.base);
app.get("/selecoes", SelecaoController.index);
app.get("/selecoes/:id", SelecaoController.show);
app.post("/selecoes", SelecaoController.store);
app.put("/selecoes/:id", SelecaoController.update);
app.delete("/selecoes/:id", SelecaoController.delete);

export default app;
