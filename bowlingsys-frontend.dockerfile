FROM node:14-alpine

# Install bash and build dependencies
RUN apk add --no-cache bash

# Check Node.js version to verify installation
RUN node -v
RUN npm -v

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ["package.json", "package-lock.json", "./"]

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the .env file (adjust if your .env is in a different location)
COPY .env .env

# Expose the port
EXPOSE 3001

# Set the user to 'node' for security
USER node

# Start the app
CMD ["npm", "start"]
