FROM amazoncorretto:17.0.7-alpine
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/coaching-session-booking-graphql-0.0.1.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
