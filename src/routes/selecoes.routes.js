// routes/selecoesRoutes.js
import { Router } from "express";
import SelecaoController from "../app/controllers/SelecaoController.js";
import { verifyToken } from "../app/security/auth.js";

const router = Router();

router.get("/", verifyToken, SelecaoController.index);
router.get("/:id", verifyToken, SelecaoController.show);
router.post("/", verifyToken, SelecaoController.store);
router.put("/:id", verifyToken, SelecaoController.update);
router.delete("/:id", verifyToken, SelecaoController.delete);

export default router;
