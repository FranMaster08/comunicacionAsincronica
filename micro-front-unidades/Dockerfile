# Utiliza una imagen base de Node
FROM node:21-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto y el servidor estático
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Establece la variable de entorno para producción
ENV NODE_ENV=production

# Expone el puerto que utiliza Vite
EXPOSE 5173

# Comando para servir la aplicación en el puerto 5173
# CMD ["serve", "-s", "dist", "-l", "5173"] 
CMD ["npm","run", "dev"]  
#  70%


