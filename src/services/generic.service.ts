import { NextFunction, Request, Response } from 'express';
import { GenericController } from '../controllers';

/**
 * Implements a generic service to be used as reference for other services
 *
 * @remarks
 * To extend this service in other services, you will need to pass the controller
 * in the constructor
 */
export class GenericService<T> {
  /**
   * Generic controller
   * @remarks: it must be replaced on extending class
   */
  controller: GenericController<T>;

  constructor(controller: GenericController<T>) {
    this.controller = controller;

    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Gets the object based on its ID
   * @param req - Request
   * @param res - Response
   * @param next - Next
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const data = await this.controller.get(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Gets all objects
   * @param req - Request
   * @param res - Response
   * @param next - Next
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.controller.getAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Creates a new object
   * @param req - Request
   * @param res - Response
   * @param next - Next
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const object = req.body;
      const data = await this.controller.create(object);

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an object
   * @param req - Request
   * @param res - Response
   * @param next - Next
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const object = req.body;
      const data = await this.controller.update(id, object);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes an object
   * @param req - Request
   * @param res - Response
   * @param next - Next
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data: boolean = await this.controller.delete(id);

      res.status(200).json(data ? 'ok' : 'not ok');
    } catch (error) {
      next(error);
    }
  }
}
