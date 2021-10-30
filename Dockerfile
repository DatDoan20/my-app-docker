FROM node:15
WORKDIR /app
COPY package.json .
# RUN npm install
# RUN npm install --only=production

# ARGS was passed by docker-compose.dev or .prod
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development"]; then npm install; else npm install --only=production; fi

COPY . ./
ENV PORT 3001
EXPOSE $PORT
CMD ["node", "index.js"]
