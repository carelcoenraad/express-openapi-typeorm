import { Operation } from "express-openapi";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { defaultResponse } from "../../definitions/responses";

// TODO: Split up this index
// TODO: Abstract repository operations to service
const getUsers: Operation = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getRepository(User).find();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
];

getUsers.apiDoc = {
  responses: {
    default: defaultResponse
  }
};

const createUser: Operation = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body;
      await getRepository(User).save(user);
      res.location(`${req.path}${user.id}`).sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
];

createUser.apiDoc = {
  responses: {
    default: defaultResponse
  }
};

const deleteUser: Operation = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getRepository(User).findOne(req.params.userId);
      if (!user) {
        res.sendStatus(410);
      }

      await getRepository(User).remove(user);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
];

deleteUser.apiDoc = {
  responses: {
    default: defaultResponse
  }
};

const getUser: Operation = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getRepository(User).findOne(req.params.userId);
      if (!user) {
        return res.sendStatus(404);
      }

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
];

getUser.apiDoc = {
  responses: {
    default: defaultResponse
  }
};

const updateUser: Operation = [
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getRepository(User).findOne(req.params.userId);
      if (!user) {
        return res.sendStatus(404);
      }

      // TODO: Figure out a smarter way how to do this
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      await getRepository(User).save(user);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
];

updateUser.apiDoc = {
  responses: {
    default: defaultResponse
  }
};

export default [
  {
    path: "/users",
    module: {
      get: getUsers,
      post: createUser
    }
  },
  {
    path: "/users/{userId}",
    module: {
      delete: deleteUser,
      get: getUser,
      put: updateUser
    }
  }
];
