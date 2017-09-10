FROM node:8.4.0-alpine

ADD frontend/package.json /tmp/frontend/package.json

RUN cd /tmp/frontend && npm install && mkdir -p /frontend && mv /tmp/frontend/node_modules /frontend

ADD backend/package.json /tmp/backend/package.json

RUN cd /tmp/backend && npm install && mkdir -p /backend && mv /tmp/backend/node_modules /backend

COPY frontend/ /frontend

WORKDIR /frontend

RUN npm run build

RUN mv dist /backend && rm -rf /frontend

EXPOSE 80

COPY backend /backend

WORKDIR /backend

CMD ["npm", "start"]
