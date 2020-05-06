"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const requireAuth_1 = __importDefault(require("../src/middlewares/requireAuth"));
const Track = mongoose_1.model('Track');
const trackRoutes = express_1.Router();
trackRoutes.use(requireAuth_1.default);
trackRoutes.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
});
trackRoutes.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;
    if (!name || !locations) {
        return res
            .status(422)
            .send({ error: 'You must provide a name and locations' });
    }
    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    }
    catch (err) {
        res.status(422).send({ error: err.message });
    }
});
exports.default = trackRoutes;
//# sourceMappingURL=trackRoutes.js.map