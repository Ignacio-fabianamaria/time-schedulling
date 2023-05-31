import { Router } from "express";
import { SchedulesControlle } from "../controllers/SchedulesController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

class SchedulesRoutes{
    private router: Router;
    private schedulesController: SchedulesControlle;
    private authMiddleware: AuthMiddleware;

    
    constructor(){
        this.router =Router();
        this.schedulesController = new SchedulesControlle()
        this.authMiddleware = new AuthMiddleware();
    }
    getRoutes():Router {
        this.router.post('/',
        this.authMiddleware.auth.bind(this.authMiddleware),
        this.schedulesController.store.bind(this.schedulesController));

        this.router.get('/',
        this.authMiddleware.auth.bind(this.authMiddleware),
        this.schedulesController.index.bind(this.schedulesController));

        return this.router;
    }
}
export{SchedulesRoutes}