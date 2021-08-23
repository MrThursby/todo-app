# Requirements
* PHP 7.3 / 8
* Node JS 14
* Yarn

# Installation
Make Database on your server
Make copy /backend/.env.example to /backend/.env
Set the parameters DB_DATABASE, DB_USERNAME, DB_PASSWORD

Start this commands:
```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed #optionally

cd ../frontend
yarn install
```

#Start app
```bash
php backend/artisan serve
cd frontend
yarn start
```
