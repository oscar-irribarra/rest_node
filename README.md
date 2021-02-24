# WebServer + RestServer

Ejecutar ```yarn install``` para reconstruir los modulos de Node.


Uso de Contenedor:

```docker run --rm  --env-file .example.env -p 8080:8080 --name restserver  rest:lastest```

```docker build -t rest:lastest .```