FROM node

# Create api directory
WORKDIR /usr/src/app

# Install api dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle api source
COPY . .

# build api for production with minification
# RUN npm run build

EXPOSE 5000
CMD ["yarn", "start"]