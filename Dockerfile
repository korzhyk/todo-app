FROM node:16-alpine AS pnpm
RUN npm install pnpm@7 --location=global

FROM pnpm AS builder

WORKDIR "/app"
COPY . .

RUN pnpm install
RUN pnpm build
RUN pnpm prune --prod

FROM pnpm AS production

ENV NODE_ENV=production

WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "sh", "-c", "pnpm start:prod"]