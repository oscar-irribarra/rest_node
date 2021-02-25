# WebServer + RestServer

Uso local:

Ejecutar ```yarn install``` para reconstruir los modulos de Node.


Uso de Contenedor:

```docker build -t rest:lastest .```

```docker run --rm --env-file .example.env -p 8080:8080 --name restserver rest:lastest```
