import { Router, Request, Response, NextFunction } from 'express';
import { dbCtrl } from "../mongoDB/dbCtrl";

export class TodosRouter {

  public router: Router;

  // Take each handler, and attach to one of the Express.Router's endpoints
  private init() {

    this.router.post('/:resource', this.create);
    this.router.get('/:resource', this.getAll);
    this.router.get('/:resource/:id', this.getOne);
    this.router.put('/:resource', this.updateOne);
    this.router.delete('/:resource/:id', this.deleteOne);

  }

  // Initialize the TodosRouter
  constructor() {
    
    this.router = Router();
    this.init();
  }
  
  // CREATE one resource
  private create(req: Request, res: Response, next: NextFunction): void {

    const resource = req.body;
    const resourceName = req.params.resource;

    if (!resource.text || !(resource.isCompleted + '')) {
      res.status(400);
      res.json({
        "error": "Invalid Data"
      });
      return
    }

    dbCtrl.create(resource, resourceName, (dbResp) => {

      if (dbResp.error) return res.status(500).send({
        message: 'Server error',
        status: res.status
      });

      return res.status(201).location(`api/todos/${resourceName}/${dbResp.data.insertId}`).send({
        message: 'Success',
        status: res.status,
        data: dbResp.data
      });

    });

  }
  // GET one resource by id
  private getOne(req: Request, res: Response, next: NextFunction): void {

    const resourceId = req.params.id;
    const resourceName = req.params.resource;

    dbCtrl.read(resourceId, resourceName, (dbResp) => {

      if (dbResp.error) return res.status(500).send({
        message: 'Server error',
        status: res.status
      });

      return res.status(200).send({
        message: 'Success',
        status: res.status,
        data: dbResp.data
      });

    });

  }

  // UPDATE one resource by id
  private updateOne(req: Request, res: Response, next: NextFunction): void {

    let resourceName = req.params.resource;
    let todo = req.body;
    let updObj = {
      isCompleted: Boolean,
      text: String
    };

    if (todo.isCompleted) { updObj.isCompleted = todo.isCompleted; }
    if (todo.text) { updObj.text = todo.text; }
    if (!updObj) {
      res.status(400);
      res.json({
        "error": "Invalid Data"
      });
      return;
    }

    dbCtrl.update(req.body, resourceName, (dbResp) => {

      if (dbResp.error) return res.status(500).send({
        message: `Database error:(${dbResp.error.code}) ${dbResp.error.message}`,
        status: res.status
      });


      return res.status(200).send({
        message: 'Success',
        status: res.status,
        data: dbResp.data
      });

    });

  }
  // GET all Resources.
  private getAll(req: Request, res: Response, next: NextFunction): void {

    const resourceName = req.params.resource;

    dbCtrl.readAll(resourceName, (dbResp) => {

      if (dbResp.error) return res.status(500).send({
        message: 'Server error',
        status: res.status
      });

      return res.status(200).send({
        message: 'Success',
        status: res.status,
        data: dbResp.data
      });

    });

  }

  // DELETE one resource by id
  private deleteOne(req: Request, res: Response, next: NextFunction): void {

    const resourceId = req.params.id;
    const resourceName = req.params.resource;

    dbCtrl.remove(resourceId, resourceName, (dbResp) => {

      if (dbResp.error) return res.status(500).send({
        message: 'Server error',
        status: res.status
      });

      return res.status(200).send({
        message: 'Success',
        status: res.status
      });

    });

  }

}

// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new TodosRouter();
export const simpleCrudRouter = intialRouter.router;
