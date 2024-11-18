# Shopping Cart

Shopping cart management exercize.

## Features

### APIs

The web server exposes the following APIs:

1. Retrieve cart products, compute their subtotals and the total;
2. Add products to cart;
3. Remove products from cart;
4. Set a discount;

## Requirements

### Language

Node.js: `version >= 20`.

### Data Management

Choose a database system to keep the following collections:

1. Products;
2. Discounts;

### Containerization

Containerize the web server with Docker and write a Docker Compose to ship both the web server and the database system.

An initialization script is executed the first time the Mongo container is launched. It initializes the database collections as follows:

- products
  - product-1
  - product-1
  - product-3
- discounts
  - discount-1
  - discount-2
  - discount-3
