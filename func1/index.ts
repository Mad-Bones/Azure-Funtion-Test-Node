import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import OpenAI from 'openai';
import { createConnection } from 'mysql2/promise';   

const client = new OpenAI({
    apiKey: process.env.OPENAI, 
  });  

  const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
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

        // TEXTO DE PRUEBA
        const prompt = "Escribe una historia corta sobre un viaje espacial";

        const response = await client.completions.create({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150,
        });

        // Procesar y mostrar la respuesta de OpenAI
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

export default httpTrigger; 