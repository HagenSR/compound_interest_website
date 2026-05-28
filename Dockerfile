# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --base-href /compound-interest-website/

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist/compound_interest_website/browser /usr/share/nginx/html/compound-interest-website
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
