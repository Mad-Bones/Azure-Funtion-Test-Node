import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import OpenAI from 'openai';
import { createConnection } from 'mysql2/promise';   

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
  });  

  const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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
        
        connection = await createConnection(connectionConfig); 
        context.log('HTTP trigger function processed a request.');

        // TEXTO DE PRUEBA
        const response = await client.completions.create({
            model: 'text-davinci-003',
            prompt: question,
            max_tokens: 150,
        });
        const generatedAnswer = response.choices[0].text.trim();
        context.res = {
            status: 200,
            body: { question, answer: generatedAnswer }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error en la llamada a OpenAI: " + error.message
        };
    } finally {
        if (connection) await connection.end();
    }
};

export default httpTrigger; 