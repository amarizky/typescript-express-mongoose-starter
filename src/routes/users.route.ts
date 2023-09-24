import { Router } from 'express';

import { UserController } from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { createUserValidation, updateUserValidation } from '@validation/users.validation';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(createUserValidation), this.user.createUser);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(updateUserValidation), this.user.updateUser);
    this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
