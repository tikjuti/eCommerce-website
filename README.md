# eCommerce-website
## Getting started
### Download project
1. Change into the project directory: 
 ```bash
   git clone https://github.com/tikjuti/eCommerce-website.git
   ```
2. Navigate to the project directory: 
 ```bash
   cd eCommerce-website
   ```
### Start client

1. Change into the client directory: 
 ```bash
   cd client
   ```
2. Install npm dependencies:
 ```bash
   npm install
   ```
3. Install npm dependencies:
 ```bash
   npm run dev
   ```
### Start server

1. Change into the project directory:
 ```bash
   cd server
   ```
2. Create the virtual environment:
 ```bash
   python3 -m venv env (for windows --> python -m venv env)
   ```
3. Activate the virtual environment:
 ```bash
   source env/bin/activate (for windows --> env\scripts\activate)
   ```
4. Install packages:
 ```bash
   pip install -r requirement.txt (same for both)
   ```
5. Update the database:
 ```bash
   python manage.py migrate
   ```
6. Start the server:
 ```bash
   python manage.py runserver
   ```
## Overview
#### 1. Home page

<img src="./client/public/home.png" style="zoom:60%" alt="game"/>
<h3 align="center">h1. Home Page</h3>

#### 2. Register

<img src="./client/public/register.png" style="zoom:60%" alt="game"/>
<h3 align="center">h2. Register</h3>

#### 3. Login

<img src="./client/public/login.png" style="zoom:60%" alt="game"/>
<h3 align="center">h3. Login</h3>

#### 4. Shop Page

<img src="./client/public/shop.png" style="zoom:60%" alt="game"/>
<h3 align="center">h4. Shop Page</h3>

#### 5. Detail Product

<img src="./client/public/detailproduct.png" style="zoom:60%" alt="game"/>
<h3 align="center">h5. Detail Product</h3>
