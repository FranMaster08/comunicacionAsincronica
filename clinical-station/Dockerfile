# Usa una imagen de Node.js como base
FROM node:19-alpine3.15

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el archivo de configuración de TypeScript
COPY tsconfig.json ./

# Copia el resto de los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación NestJS (ajústalo según las necesidades de tu aplicación)
EXPOSE 3000

# Define el comando que se ejecutará cuando se inicie el contenedor
CMD ["npm", "start"]