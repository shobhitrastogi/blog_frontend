# Step 1: Use official Node.js image as the base image
FROM node:18

# Step 2: Set working directory for the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy all application files into the container
COPY . .

# Step 6: Expose the port that the Vite development server uses
EXPOSE 5173

# Step 7: Build the Vite project for production (only if needed)
RUN npm run build

# Step 8: Start the Vite preview server (or you can also serve your built app with another server like Nginx)
CMD ["npm", "run", "preview"]
