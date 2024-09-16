"use strict";
const OpenAI = require('openai');
const { createConnection } = require('mysql2/promise');

const client = new OpenAI({
    apiKey: process.env.OPENAI,
});

const httpTrigger = async function (context) {
    const connectionConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    };

    let connection;
    try {
        connection = await createConnection(connectionConfig);
        context.log('HTTP trigger function processed a request.');

        // Prompt fijo para OpenAI (sin usar request)
        const prompt = "Escribe una historia corta sobre un viaje espacial";

        const response = await client.completions.create({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150,
        });

        const generatedText = response.choices[0].text;

        context.res = {
            status: 200,
            body: `OpenAI: ${generatedText}`
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error en la ejecución: " + error.message
        };
    } finally {
        if (connection) await connection.end();
    }
};

module.exports = httpTrigger;