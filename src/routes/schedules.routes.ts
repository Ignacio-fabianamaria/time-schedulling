import { Router } from "express";
import { SchedulesControlle } from "../controllers/SchedulesController";

class SchedulesRoutes{
    private router: Router;
    private schedulesController: SchedulesControlle;
    
    constructor(){
        this.router =Router();
        this.schedulesController = new SchedulesControlle()
    }
    getRoutes():Router {
        this.router.post('/', this.schedulesController.store.bind(this.schedulesController));
        return this.router;
    }
}
export{SchedulesRoutes}