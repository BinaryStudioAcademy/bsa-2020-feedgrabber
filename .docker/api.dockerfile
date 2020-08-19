FROM gradle:6.3.0-jdk11 as builder
USER root
WORKDIR /builder

# copy project dir and run build
ADD ./backend/core /builder
RUN gradle assemble

# used alpine linux for small disk size
FROM openjdk:13-alpine
WORKDIR /app
EXPOSE 5000
COPY --from=builder /builder/build/libs/core-0.0.1-SNAPSHOT.jar .

# Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

ENTRYPOINT [ "java", "-jar", "core-0.0.1-SNAPSHOT.jar" ]