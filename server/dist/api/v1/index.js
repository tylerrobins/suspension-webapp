"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    return res.status(200).json({
        message: '1️⃣ - API VERSION 1.'
    });
});
router.use('/user', user_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map