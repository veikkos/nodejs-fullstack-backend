# Backend example with Node.js

This backend works together with [React frontend
example](https://github.com/veikkos/react-fullstack-frontend).

## Usage

You need to create [MongoDB cluster](https://www.mongodb.com/) and
provider your MongoDB URI (`YOUR_MONGODB_URI`) in-place at `index.js`

```
npm install
npm start
```

Backend is started to port 3001. You can test it with
browser. Following command should initially return empty list.

`http://localhost:3001/address`

### API

Supports GET/POST/DELETE operations for `/address` API. Backend does
not have its own persistent storage or cache but MongoDB is used.

You can see all requests printed for easier debugging:

```
GET /address
Body: {}

POST /address
Body: { name: 'Veikko', address: 'Mannerheimintie', developer: true }
```