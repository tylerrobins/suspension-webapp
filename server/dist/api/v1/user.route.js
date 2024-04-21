"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const argon2 = __importStar(require("argon2"));
const data_source_config_1 = require("../../data-source.config");
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    return res.status(200).json({
        message: '🙋‍♂️ Users 🙋‍♀️'
    });
});
router.post('/create', async (req, res) => {
    const email = req.body.email.toString();
    const password = await argon2.hash(req.body.password.toString());
    const userRepository = data_source_config_1.AppDataSource.getRepository(user_entity_1.default);
    const user = userRepository.create({
        email: email,
        password: password
    });
    await userRepository.save(user);
    return res.status(200).json({ 'user created': user });
});
router.post('/login', async (req, res) => {
    let email;
    let password;
    try {
        email = req.body.email.toString();
        password = req.body.password.toString();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: "Invalid email or password." });
        ;
    }
    if (!email || !password) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
        ;
    }
    const userRepository = data_source_config_1.AppDataSource.getRepository(user_entity_1.default);
    try {
        const user = await userRepository.findOneByOrFail({ email: email });
        if (await argon2.verify(user.password, password)) {
            req.session.userId = user.id;
            console.log("Session after login:", req.session);
            return res.status(200).json({ success: true, message: "Login Successful" });
        }
        else {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
            ;
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.status(401).json({ success: false, message: "Invalid email or password." });
    ;
});
router.get('/list', async (req, res) => {
    console.log("REQ SESSION: ", req.session.cookie);
    const userRepository = data_source_config_1.AppDataSource.getRepository(user_entity_1.default);
    const users = await userRepository.find();
    console.log(users);
    return res.status(200).json(users);
});
exports.default = router;
//# sourceMappingURL=user.route.js.map