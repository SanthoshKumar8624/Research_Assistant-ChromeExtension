FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .

WORKDIR /app/BackEnd
RUN chmod +x ../mvnw
RUN ../mvnw clean package -DskipTests

CMD ["sh", "-c", "java -jar target/*.jar"]