"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('./models/User');
require('./models/Track');
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const trackRoutes_1 = __importDefault(require("../routes/trackRoutes"));
const requireAuth_1 = __importDefault(require("./middlewares/requireAuth"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(authRoutes_1.default);
app.use(requireAuth_1.default);
app.use(trackRoutes_1.default);
const mongoUri = 'mongodb+srv://admin:carteldecali@cluster0-lqig6.mongodb.net/test?retryWrites=true&w=majority';
mongoose_1.default.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose_1.default.connection.on('error', err => {
    console.log('Error connecting to mongo', err);
});
app.get('/', (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});
app.post('/t', (req, res) => {
    res.send('Post a la verga');
    res.end();
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
//# sourceMappingURL=index.js.map