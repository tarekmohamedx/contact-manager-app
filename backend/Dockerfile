# 1. Use an official Node.js image
FROM node:18

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the backend source code
COPY . .

# 6. Expose the backend port (as in your Express app)
EXPOSE 3000

# 7. Set environment variables if needed (or use docker-compose)
# ENV JWT_SECRET=your_secret

# 8. Start the server
CMD ["npm", "start"]
