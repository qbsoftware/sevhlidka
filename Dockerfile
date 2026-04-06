ARG LEPRIKON_TAG=latest
FROM leprikon/leprikon:$LEPRIKON_TAG

LABEL maintainer="Jakub Dorňák <jakub.dornak@qbsoftware.cz>"

# copy files
COPY sevhlidka /app/sevhlidka

ENV SITE_MODULE=sevhlidka
