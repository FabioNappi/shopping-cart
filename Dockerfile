FROM node:22-alpine AS build

WORKDIR /build-dir
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

########################################################################################################################

FROM node:22-alpine

COPY --from=build /build-dir/package.json package.json
COPY --from=build /build-dir/package-lock.json package-lock.json
COPY --from=build /build-dir/dist dist
RUN npm ci --omit=dev

CMD npm run start
