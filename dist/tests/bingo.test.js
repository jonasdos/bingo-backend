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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../src/app"));
var database_1 = __importDefault(require("../src/database"));
var bingo_factory_1 = require("./factories/bingo-factory");
var http_status_1 = __importDefault(require("http-status"));
var api = (0, supertest_1.default)(app_1.default);
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.number.deleteMany()];
            case 1:
                _a.sent();
                return [4 /*yield*/, database_1.default.game.deleteMany()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("GET /games", function () {
    it("should get game by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, _a, status, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, bingo_factory_1.generateNewGame)()];
                case 1:
                    id = (_b.sent()).id;
                    return [4 /*yield*/, api.get("/games/".concat(id))];
                case 2:
                    _a = _b.sent(), status = _a.status, body = _a.body;
                    expect(status).toBe(http_status_1.default.OK);
                    expect(body).toEqual({
                        id: id,
                        finished: false,
                        date: expect.any(String),
                        numbers: []
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 404 if game not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, api.get("/games/1")];
                case 1:
                    _a = _b.sent(), status = _a.status, body = _a.body;
                    expect(status).toBe(http_status_1.default.NOT_FOUND);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 400 if id is not valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, api.get("/games/idNotValid")];
                case 1:
                    _a = _b.sent(), status = _a.status, body = _a.body;
                    expect(status).toBe(http_status_1.default.BAD_REQUEST);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST /games/start", function () {
    it("should create a new game", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, api.post("/games/start")];
                case 1:
                    _a = _b.sent(), status = _a.status, body = _a.body;
                    expect(status).toBe(http_status_1.default.CREATED);
                    expect(body).toEqual({
                        id: expect.any(Number),
                        finished: false,
                        date: expect.any(String)
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    describe("PATCH /games/finish", function () {
        it("should finish a game", function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, status, game;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bingo_factory_1.generateNewGame)()];
                    case 1:
                        id = (_a.sent()).id;
                        return [4 /*yield*/, api.patch("/games/finish/".concat(id))];
                    case 2:
                        status = (_a.sent()).status;
                        expect(status).toBe(http_status_1.default.NO_CONTENT);
                        return [4 /*yield*/, database_1.default.game.findUnique({
                                where: { id: id }
                            })];
                    case 3:
                        game = _a.sent();
                        expect(game.finished).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 404 if game is not found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.patch("/games/finish/1")];
                    case 1:
                        status = (_a.sent()).status;
                        expect(status).toBe(http_status_1.default.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 if game is already finished", function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bingo_factory_1.generateNewGame)(true)];
                    case 1:
                        id = _a.sent();
                        return [4 /*yield*/, api.patch("/games/finish/".concat(id))];
                    case 2:
                        status = (_a.sent()).status;
                        expect(status).toBe(http_status_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PATCH /games/number", function () {
        it("should generate a new number for a game", function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, _a, status, body, number;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, bingo_factory_1.generateNewGame)()];
                    case 1:
                        id = (_b.sent()).id;
                        return [4 /*yield*/, api.patch("/games/number/".concat(id))];
                    case 2:
                        _a = _b.sent(), status = _a.status, body = _a.body;
                        expect(status).toBe(http_status_1.default.OK);
                        expect(body).toEqual({
                            id: expect.any(Number),
                            value: expect.any(Number),
                            gameId: id
                        });
                        return [4 /*yield*/, database_1.default.number.findUnique({
                                where: { id: body.id }
                            })];
                    case 3:
                        number = _b.sent();
                        expect(number).not.toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 404 if game is not found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.patch("/games/number/1")];
                    case 1:
                        status = (_a.sent()).status;
                        expect(status).toBe(http_status_1.default.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 if game is already finished", function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bingo_factory_1.generateNewGame)(true)];
                    case 1:
                        id = _a.sent();
                        return [4 /*yield*/, api.patch("/games/number/".concat(id))];
                    case 2:
                        status = (_a.sent()).status;
                        expect(status).toBe(http_status_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 if game already has all numbers", function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bingo_factory_1.generateFullGame)()];
                    case 1:
                        id = (_a.sent()).id;
                        return [4 /*yield*/, api.patch("/games/number/".concat(id))];
                    case 2:
                        status = (_a.sent()).status;
                        expect(status).toBe(http_status_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
