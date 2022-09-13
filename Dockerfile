###############################
# Build webui app and statics #
###############################
FROM node:16.17.0-slim as builder

# Add the code and compile the app.
COPY . /code
RUN cd /code && npm ci && npm run build


######################################
# Package webui into a smaller image #
######################################
FROM node:16.17.0-slim

# Create a replicante user to avoid using root.
ARG REPLI_GID=1616
ARG REPLI_GNAME=replicante
ARG REPLI_UID=1616
ARG REPLI_UNAME=replicante
RUN addgroup --gid $REPLI_GID $REPLI_GNAME \
    && adduser --disabled-login --disabled-password --system --uid $REPLI_UID --gid $REPLI_GID $REPLI_UNAME

# Copy node app from builder to smaller image.
COPY --from=builder /code/dist /opt/replicante/webui/dist
COPY --from=builder /code/server /opt/replicante/webui/server
COPY --from=builder /code/package.json /opt/replicante/webui/package.json
COPY --from=builder /code/package-lock.json /opt/replicante/webui/package-lock.json
RUN chown -R $REPLI_UNAME:$REPLI_GNAME /opt/replicante/webui

# Set up runtime environment as needed.
ENV LISTEN_PORT=3000
ENV REPLI_BACKEND_ROOT=http://localhost:16016
EXPOSE $LISTEN_PORT
USER $REPLI_UNAME
WORKDIR /opt/replicante/webui
RUN npm ci --only=prod
CMD ["npm", "run", "server"]
