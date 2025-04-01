# Laravel Inertia React Project Setup

## Prerequisites
Ensure you have the following installed on your system:
- PHP (>= 8.1)
- Composer
- Node.js (>= 16)
- npm or yarn
- MySQL or PostgreSQL (or any database supported by Laravel)
- Laravel CLI

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/yahiaAnes/LearnMate
cd LearnMate
```

### 2. Install Backend Dependencies
```sh
composer install
```

### 3. Install Frontend Dependencies
```sh
npm install  # or yarn install
```

### 4. Copy Environment File
```sh
cp .env.example .env
```

### 5. Generate Application Key
```sh
php artisan key:generate
```

### 6. Configure Database
Edit the `.env` file and set up your database credentials:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### 7. Run Migrations
```sh
php artisan migrate --seed
```

### 8. Build Frontend Assets
```sh
npm run build  # or yarn build
```

### 9. Run Development Server
```sh
php artisan serve
```

### 10. Run Vite for Hot Reloading
```sh
npm run dev  # or yarn dev
```

## Additional Commands
- **Clear Cache**
  ```sh
  php artisan cache:clear
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```
- **Run Tests**
  ```sh
  php artisan test
  ```
- **Generate Optimized Files for Production**
  ```sh
  php artisan optimize
  ```

## Usage
After completing the setup, you can access the application at:
```
http://127.0.0.1:8000
```
Enjoy developing your Laravel Inertia React project!

