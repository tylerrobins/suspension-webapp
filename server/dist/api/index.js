"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_1 = __importDefault(require("./v1"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    return res.status(200).json({
        message: '🚙 API ROUTE 🚗'
    });
});
router.use('/v1', v1_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map