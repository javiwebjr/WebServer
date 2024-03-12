




# Dev

1. Clonar el .env.template y crear el .env


3. Si se quiere montar la base de datos en la una como Neon Tech, se crea la base de datos
Y ademas hay que provicionar el comando ```"prisma:migrate:prod": "prisma migrate deploy"```
Para hacer la migracion de las tablas.

4. Tambien se puede agregar el comando ```"prisma:migrate:prod"``` al comando de "build"
Para que cuando se haga el build de produccion este haga la migracion automaticamente