ARG LEPRIKON_TAG=latest
FROM leprikon/leprikon:$LEPRIKON_TAG

MAINTAINER Jakub Dorňák <jakub.dornak@misli.com>

# copy files
COPY templates /app/templates
