# Utiliza una imagen base de Node
FROM node:20.11.1

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "run", "serve"]
