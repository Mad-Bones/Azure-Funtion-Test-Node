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
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const promise_1 = require("mysql2/promise");
const client = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const question = req.query.question || (req.body && req.body.question);
        const connectionConfig = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        };
        if (!question) {
            context.res = {
                status: 400,
                body: "Por favor, proporciona una pregunta."
            };
            return;
        }
        let connection;
        try {
            connection = yield (0, promise_1.createConnection)(connectionConfig);
            context.log('HTTP trigger function processed a request.');
            // TEXTO DE PRUEBA
            const response = yield client.completions.create({
                model: 'text-davinci-003',
                prompt: question,
                max_tokens: 150,
            });
            const generatedAnswer = response.choices[0].text.trim();
            context.res = {
                status: 200,
                body: { question, answer: generatedAnswer }
            };
        }
        catch (error) {
            context.res = {
                status: 500,
                body: "Error en la llamada a OpenAI: " + error.message
            };
        }
        finally {
            if (connection)
                yield connection.end();
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map