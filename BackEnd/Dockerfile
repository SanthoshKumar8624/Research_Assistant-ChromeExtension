FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

# Give permission to mvnw in ROOT
RUN chmod +x mvnw

# Build using BackEnd pom.xml
RUN ./mvnw -f BackEnd/pom.xml clean package -DskipTests

# Run jar from BackEnd target
CMD ["sh", "-c", "java -jar BackEnd/target/*.jar"]