import express from 'express'
import { create, deleteTodo, getAll, getOne, update } from '../controllers/userController.js';

const route = express.Router()


route.post('/create',create);
route.get("/read",getAll);
route.get("/readone/:id",getOne);
route.put("/update/:id",update);
route.put("/update/:id",update);
route.delete("/delete/:id",deleteTodo);

export default route;