import express, {Application} from 'express';
import cors from 'cors';
import routesApartment from "../routes/apartment";
import routesTenant from "../routes/tenant";
import routesAdmin from "../routes/admin";
import { Admin } from './admin';
import { Tenant } from './tenant';
import { Apartment } from './apartment';

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto '+this.port);
        })
    }

    routes(){
        this.app.use('/api/apartments', routesApartment);
        this.app.use('/api/tenants', routesTenant);
        this.app.use('/api/admins', routesAdmin);
    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());
        //Cors
        this.app.use(cors());
    }

    async dbConnect(){

        try {
            await Admin.sync();
            await Tenant.sync();
            await Apartment.sync();
            console.log('Base de datos conectada correctamente.')
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;