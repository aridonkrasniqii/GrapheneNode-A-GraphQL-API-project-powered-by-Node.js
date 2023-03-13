CREATE TABLE users
(
    user_id    SERIAL PRIMARY KEY,
    first_name VARCHAR(255)        NOT NULL,
    last_name  VARCHAR(255)        NOT NULL,
    username   VARCHAR(50) UNIQUE  NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE categories
(
    category_id SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);



CREATE TABLE products
(
    product_id  SERIAL PRIMARY KEY,
    name        VARCHAR(255)                                NOT NULL,
    description TEXT,
    price       NUMERIC(10, 2)                              NOT NULL,
    image_url   TEXT,
    category_id INTEGER REFERENCES categories (category_id) NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders
(
    order_id   SERIAL PRIMARY KEY,
    user_id    INTEGER REFERENCES users (user_id) NOT NULL,
    comments   TEXT,
    order_date timestamp DEFAULT NOW()
);


CREATE TABLE order_items
(
    order_id   INTEGER REFERENCES orders (order_id)     NOT NULL,
    product_id INTEGER REFERENCES products (product_id) NOT NULL,
    quantity   INTEGER                                  NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE payments
(
    payment_id   SERIAL PRIMARY KEY,
    order_id     INTEGER REFERENCES orders (order_id) NOT NULL,
    amount       NUMERIC(10, 2)                       NOT NULL,
    payment_date TIMESTAMP DEFAULT NOW()
);






-- ADD THESE FIELDS IN USER TABLE DATABASE 


-- passwordChangedAt: Date,
--   passwordResetToken: String,
--   passwordResetExpires: Date,
--   active: {
--     type: Boolean,
--     default: true,
--     select: false // hide this field from showing up
--   }