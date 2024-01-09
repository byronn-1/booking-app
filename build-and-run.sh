#!/bin/bash

# Step 1: Build the project with Maven
echo "Building Spring Boot Project with Maven"
mvn clean package -Dmaven.test.skip=true

# Check if Maven build was successful
if [ $? -eq 0 ]; then
    echo "Maven build was successful."
else
    echo "Maven build failed."
    exit 1
fi

# Step 2: Build the Docker image
echo "Building Docker Image"
docker build -t spring-boot-app .

# Step 3: Run the Docker container
echo "Running Docker Container"
docker run -p 8080:8080 spring-boot-app
