"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('*', (_req, res) => {
    const frontendPath = path_1.default.resolve(__dirname, '../', 'frontend', 'index.html');
    console.log(`FRONTEND PATH: ${frontendPath}`);
    res.sendFile(frontendPath);
});
exports.default = router;
//# sourceMappingURL=svelte-route.js.map