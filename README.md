# Azure-Funtion-Test-Node
Funcion simple de prueba HttpTriger de Azure en Node.js

La prueba en este caso se ejecuta en 
`http://localhost:7071/api/func1`


## Requisitos
Instalar Azure Functions Core Tools: https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local

Instalar Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

Instalar la extensión de Azure Functions en Visual Studio Code: Busca la extensión en el Marketplace de VSCode. (Este ultimo paso puede dar conflictos. en ese caso hay que reinstalar las extenciones que estan arraigadas a esta por otras que sean de al menos 2 años)


## Pasos:
1- Luego de copiar el repositorio ejecutar `npm install` o `npm i` o `npm i --f`(en caso de que los anteriores fallen).

2- En el fichero `local.settings.json`
`
{
...
"Values": {
"AzureWebJobsStorage": "UseDevelopmentStorage=true",
...
}
}
`

3- Ejecutar el comando `func start --verbose` para ejecutar la funcion con detalles extra en la consola en caso de que surga un error.

4- La prueba se puede realizar en `http://localhost:7071/api/func1` una vez que se ejecute correctamente la funcion.


## Produccion:
Para desplegando tu función en un entorno de producción, deberás asegurarte de configurar `AzureWebJobsStorage` con la cadena de conexión de tu cuenta de almacenamiento de Azure.

`"AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=<your_account_name>;AccountKey=<your_account_key>;EndpointSuffix=core.windows.net"`

Reemplaza <your_account_name> y <your_account_key> con los valores de tu cuenta de almacenamiento de Azure.
