"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apartment_1 = __importDefault(require("../routes/apartment"));
const tenant_1 = __importDefault(require("../routes/tenant"));
const admin_1 = __importDefault(require("../routes/admin"));
const tenantHistory_1 = __importDefault(require("../routes/tenantHistory"));
const payment_1 = __importDefault(require("../routes/payment"));
const ticket_1 = __importDefault(require("../routes/ticket"));
const contract_1 = __importDefault(require("../routes/contract"));
const admin_2 = require("./admin");
const tenant_2 = require("./tenant");
const apartment_2 = require("./apartment");
const contract_2 = require("./contract");
const payment_2 = require("./payment");
const tenantHistory_2 = require("./tenantHistory");
const ticket_2 = require("./ticket");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/apartments', apartment_1.default);
        this.app.use('/api/tenants', tenant_1.default);
        this.app.use('/api/admins', admin_1.default);
        this.app.use('/api/tenantHistory', tenantHistory_1.default);
        this.app.use('/api/payments', payment_1.default);
        this.app.use('/api/tickets', ticket_1.default);
        this.app.use('/api/contracts', contract_1.default);
    }
    midlewares() {
        // Parseo body
        this.app.use(express_1.default.json());
        //Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield admin_2.Admin.sync();
                yield tenant_2.Tenant.sync();
                yield apartment_2.Apartment.sync();
                yield contract_2.Contract.sync();
                yield payment_2.Payment.sync();
                yield tenantHistory_2.TenantHistory.sync();
                yield ticket_2.Ticket.sync();
                console.log('Base de datos conectada correctamente.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
