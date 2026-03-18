FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

# give permission to mvnw (root level)
RUN chmod +x mvnw

# build from ROOT (NOT BackEnd)
RUN ./mvnw clean package -DskipTests

# run jar
CMD ["sh", "-c", "java -jar target/*.jar"]