### Teslo API
Pasos a seguir:

1. Clonar ambos proyectos
2. Correr ```npm i``` en ambos proyectos
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la DB 
```
docker-compose up -d
```
6. Levantar back
```
npm run start:dev
```
7. Ejecutar SEED
```
http://localhost:3000/api/seed
```
8. Levantar front
```
ng serve
```