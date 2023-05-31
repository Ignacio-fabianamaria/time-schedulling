import { Router, request, response } from 'express';
import { UsersController } from '../controllers/UsersController';
import { upload } from '../config/multer';
class UsersRoutes {
    private router: Router;
    private usersController: UsersController;
    constructor() {
        this.router = Router();
        this.usersController = new UsersController;
    }
    getRoutes() {
        this.router.post('/', this.usersController.store.bind(this.usersController));
        this.router.put('/',
        upload.single('avatar_url'),
        this.usersController.update.bind(this.usersController));
        this.router.post('/auth', this.usersController.auth.bind(this.usersController));
        return this.router;
    }
}
export { UsersRoutes }