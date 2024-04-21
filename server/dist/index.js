"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const data_source_config_1 = require("./data-source.config");
const port = process.env.PORT || 8080;
const main = async () => {
    await data_source_config_1.AppDataSource.initialize()
        .then(() => {
        console.log('CONNECTED TO DB');
    }).catch((err) => {
        console.error('DB ERROR: ', err);
    });
    app_1.default.listen(port, () => {
        process.env.NODE_ENV === 'production' ? console.log(`Server is up at port ${port}`) : console.log(`Server is up at http://localhost:${port}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map