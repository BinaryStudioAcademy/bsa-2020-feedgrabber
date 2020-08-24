FROM gradle:6.5.1-jdk11 as builder
USER root
WORKDIR /builder

# copy project dir and run build
ADD ./backend/event_processor /builder
RUN gradle assemble

# used alpine linux for small disk size
FROM openjdk:11
WORKDIR /app
EXPOSE 5001
COPY --from=builder /builder/build/libs/event_processor-0.0.1-SNAPSHOT.jar .

# Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

ENTRYPOINT [ "java", "-jar", "event_processor-0.0.1-SNAPSHOT.jar" ]