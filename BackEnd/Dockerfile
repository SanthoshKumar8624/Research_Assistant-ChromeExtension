FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

# Move into backend (where pom.xml exists)
WORKDIR /app/BackEnd

# Give permission to mvnw inside backend
RUN chmod +x mvnw

# Build project from correct location
RUN ./mvnw clean package -DskipTests

# Run jar
CMD ["sh", "-c", "java -jar target/*.jar"]