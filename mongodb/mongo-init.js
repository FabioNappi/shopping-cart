/* eslint-disable no-undef */
db.createCollection('products')
db.products.insertMany([
  {
    productId: 'product-1',
    description: 'product one',
    price: 999,
  },
  {
    productId: 'product-2',
    price: 500,
  },
  {
    productId: 'product-3',
    description: 'product three',
    price: 7000,
  },
])
db.products.createIndex({ productId: 1 }, { name: 'unique_productId', unique: true })

db.createCollection('discounts')
db.discounts.insertMany([
  {
    code: 'discount-1',
    type: 'fixed',
    amount: 500,
  },
  {
    code: 'discount-2',
    type: 'percentage',
    amount: 20,
  },
  {
    code: 'discount-3',
    type: 'fixed',
    amount: 2000,
  },
])
db.discounts.createIndex({ code: 1 }, { name: 'unique_code', unique: true })
