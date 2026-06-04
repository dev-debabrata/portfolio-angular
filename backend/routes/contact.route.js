import express from "express";

const router = express.Router();

router.post("/", sendMessage);

router.get("/", protectAdmin, getMessages);

router.delete("/:id", protectAdmin, deleteMessage);

export default router;
