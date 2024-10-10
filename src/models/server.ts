import express, {Application} from 'express';
import cors from 'cors';
import routesApartment from "../routes/apartment";
import routesTenant from "../routes/tenant";
import routesAdmin from "../routes/admin";
import routesTenantHistory from "../routes/tenantHistory";
import routesPayment from "../routes/payment"
import { Admin } from './admin';
import { Tenant } from './tenant';
import { Apartment } from './apartment';
import { Contract } from './contract';
import { Payment } from './payment';
import { TenantHistory } from './tenantHistory';
import { Ticket } from './ticket';

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
        this.app.use('/api/tenantHistory', routesTenantHistory);
        this.app.use('/api/payments', routesPayment);
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
            await Contract.sync();
            await Payment.sync();
            await TenantHistory.sync();
            await Ticket.sync();
            console.log('Base de datos conectada correctamente.')
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;