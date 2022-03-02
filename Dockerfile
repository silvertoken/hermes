from node:17-alpine as dev
RUN apk update && apk add --no-cache git openssh

#build steps
from dev as builder
workdir /app
copy src/ *.json ./
run npm install --prod

#production
from node:17-alpine as prod
workdir /app
copy --from=builder /app/ ./
copy --from=builder /app/node_modules/ ./node_modules/
copy --from=builder /app/package.json .
entrypoint ["/bin/bash", "-c"]
cmd ["npm", "start"]
