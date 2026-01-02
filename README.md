# LearnMate - Collaborative Learning Platform

## 🎯 Project Overview

LearnMate is a modern, full-stack collaborative learning platform designed to connect students and facilitate peer-to-peer learning experiences. The platform enables students to find study partners, create collaboration opportunities, request study sessions, and access educational courses—all in one seamless environment.

### Core Concept

LearnMate bridges the gap between students seeking to learn and those willing to teach or collaborate. Whether you're looking for a study group, a mentor, a project partner, or someone to learn from, LearnMate provides the tools and community to make meaningful educational connections.

---

## ✨ Key Features

### 👥 Partner Discovery & Matching
- **Advanced Search**: Find study partners by name, speciality, email, or skills
- **Smart Filtering**: Filter by subject, experience level, and university
- **Profile Viewing**: Browse detailed profiles with skills, bio, and academic information
- **Partner Recommendations**: Discover compatible study partners based on your profile

### 🤝 Collaboration System
- **Multiple Collaboration Types**:
  - **Learn**: Find someone to teach you a subject
  - **Teach**: Offer to teach others
  - **Study Group**: Form study groups
  - **Project**: Collaborate on projects
  - **Mentorship**: Connect mentors with mentees
  - **Research**: Find research partners
- **Request Management**: Create, accept, reject, and track collaboration requests
- **Status Tracking**: Monitor pending, accepted, and rejected collaborations

### 📅 Study Session Requests
- **Session Booking**: Request study sessions with preferred partners
- **Time Scheduling**: Set preferred dates and times for sessions
- **Request Management**: Accept, reject, or cancel study session requests
- **Response Tracking**: View and manage responses to your requests

### 📚 Course Management
- **Course Catalog**: Browse available courses
- **Course Details**: View course information including price, duration, level, and speciality
- **Course Enrollment**: Access course content and materials

### 👤 User Profiles & Skills
- **Comprehensive Profiles**: Showcase university, speciality, level, and bio
- **Skills Management**: Add, update, and display your skills with proficiency levels
- **Profile Customization**: Upload profile images and personalize your presence
- **Public Profiles**: Share your profile with the community

### 🔐 Authentication & Security
- **Email/Password Authentication**: Traditional registration and login
- **Google OAuth**: Quick sign-in with Google accounts
- **Email Verification**: Secure account verification system
- **Password Reset**: Recover forgotten passwords
- **Protected Routes**: Secure access to authenticated features

### 🎨 Admin Panel
- **Filament Admin**: Powerful admin interface for managing users and courses
- **User Management**: View, create, edit, and manage user accounts
- **Course Management**: Administer course catalog and content
- **Collaboration Oversight**: Monitor and manage collaboration requests

---

## 🛠️ Tech Stack

### Backend

#### Framework & Core
- **Laravel 12**: Modern PHP framework for robust backend development
- **PHP 8.2+**: Latest PHP version with enhanced performance and features
- **MySQL/PostgreSQL**: Relational database for data persistence

#### Authentication & Security
- **Laravel Sanctum**: API token authentication for secure API access
- **Laravel Socialite**: OAuth integration for Google authentication
- **Laravel Breeze**: Authentication scaffolding with email verification

#### Admin & Management
- **Filament 3.3**: Beautiful admin panel built on Livewire
- **Admin Resources**: Pre-built CRUD interfaces for users and courses

#### Development Tools
- **Laravel Tinker**: Interactive REPL for Laravel
- **Laravel Pint**: Code style fixer
- **Pest PHP**: Modern testing framework
- **Laravel Pail**: Real-time log viewer

### Frontend

#### Core Framework
- **React 18.2**: Modern UI library for building interactive interfaces
- **TypeScript 5.0**: Type-safe JavaScript for better code quality
- **Inertia.js 2.0**: Seamless SPA experience without API complexity

#### UI & Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives:
  - Avatar, Dialog, Label, Select, Switch, Tabs
- **Tailwind Animate**: Animation utilities
- **Framer Motion 12.6**: Advanced animations and transitions
- **Lucide React**: Beautiful icon library

#### Forms & Input
- **Headless UI**: Unstyled, accessible UI components
- **Tailwind Forms**: Form styling plugin
- **Class Variance Authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class utilities

#### Utilities
- **date-fns 4.1**: Date manipulation and formatting
- **react-scroll**: Smooth scrolling functionality
- **Axios**: HTTP client for API requests

### Build Tools & Development

#### Build System
- **Vite 6.0**: Next-generation frontend build tool
- **Laravel Vite Plugin**: Seamless integration between Laravel and Vite
- **TypeScript Compiler**: Type checking and compilation

#### Development Environment
- **Concurrently**: Run multiple development servers simultaneously
- **Hot Module Replacement**: Instant updates during development

### Additional Tools
- **Ziggy 2.0**: Generate JavaScript route helpers from Laravel routes
- **PostCSS**: CSS processing with Autoprefixer

---

## 📁 Project Structure

```
LearnMate/
├── app/
│   ├── Filament/              # Admin panel resources
│   │   └── Resources/
│   │       ├── CourseResource/
│   │       └── UserResource/
│   ├── Http/
│   │   ├── Controllers/       # Application controllers
│   │   │   ├── Auth/          # Authentication controllers
│   │   │   ├── CollabController.php
│   │   │   ├── CourseController.php
│   │   │   ├── RequestController.php
│   │   │   ├── ResponseController.php
│   │   │   ├── SkillController.php
│   │   │   └── UserController.php
│   │   ├── Middleware/        # Custom middleware
│   │   └── Requests/           # Form request validation
│   ├── Models/                # Eloquent models
│   │   ├── User.php
│   │   ├── Collab.php
│   │   ├── Course.php
│   │   ├── RequestSession.php
│   │   └── Skill.php
│   └── Policies/               # Authorization policies
│
├── resources/
│   ├── js/
│   │   ├── Components/         # Reusable React components
│   │   │   └── ui/             # Radix UI components
│   │   ├── Layouts/            # Page layouts
│   │   ├── Pages/              # Inertia page components
│   │   │   ├── Auth/           # Authentication pages
│   │   │   ├── User/           # User feature pages
│   │   │   ├── Main/           # Public pages
│   │   │   └── Profile/        # Profile management
│   │   ├── Sections/           # Landing page sections
│   │   └── types/              # TypeScript definitions
│   └── views/                  # Blade templates
│
├── routes/
│   ├── web.php                 # Web routes
│   └── auth.php                # Authentication routes
│
└── database/
    └── migrations/             # Database schema migrations
```

---

## 🚀 Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **PHP** >= 8.2
- **Composer** (PHP dependency manager)
- **Node.js** >= 16
- **npm** or **yarn**
- **MySQL** or **PostgreSQL**
- **Laravel CLI** (optional but recommended)

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/yahiaAnes/LearnMate
cd LearnMate
```

#### 2. Install Backend Dependencies
```bash
composer install
```

#### 3. Install Frontend Dependencies
```bash
npm install  # or yarn install
```

#### 4. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

#### 5. Configure Database
Edit the `.env` file with your database credentials:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=learnmate_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### 6. Configure Google OAuth (Optional)
Add to your `.env` file:
```ini
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

#### 7. Run Database Migrations
```bash
php artisan migrate --seed
```

#### 8. Build Frontend Assets
```bash
npm run build  # or yarn build
```

#### 9. Start Development Servers

**Option 1: Run separately**
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

**Option 2: Run concurrently (recommended)**
```bash
composer run dev
```
This command runs Laravel server, queue worker, Pail logs, and Vite dev server simultaneously.

---

## 📖 Usage

After completing the setup, access the application at:
```
http://127.0.0.1:8000
```

### Getting Started
1. **Register** a new account or **sign in** with Google
2. **Complete your profile** with university, speciality, level, and bio
3. **Add skills** to your profile to help others find you
4. **Search for partners** or browse collaboration requests
5. **Create collaborations** or request study sessions
6. **Browse courses** and enroll in learning opportunities

---

## 🔧 Additional Commands

### Cache Management
```bash
  php artisan cache:clear
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```

### Run Tests
```bash
  php artisan test
  ```

### Production Optimization
```bash
  php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Code Style
```bash
php artisan pint
```

---

## 🎨 Design Philosophy

LearnMate follows a modern, dark-themed design with:
- **Glassmorphism**: Backdrop blur effects for depth
- **Gradient Accents**: Blue-to-purple gradients for primary actions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful interactions
- **Accessibility**: Radix UI components ensure WCAG compliance

---

## 🔐 Security Features

- **CSRF Protection**: Laravel's built-in CSRF token validation
- **XSS Protection**: Automatic output escaping
- **SQL Injection Prevention**: Eloquent ORM with parameter binding
- **Password Hashing**: Bcrypt password encryption
- **Email Verification**: Required for account activation
- **Route Protection**: Middleware-based authentication
- **Policy-Based Authorization**: Granular permission control

---

## 📝 Database Schema

### Core Models

- **Users**: User accounts with profile information
- **Skills**: User skills with proficiency levels
- **Collabs**: Collaboration requests between users
- **RequestSessions**: Study session requests
- **Courses**: Educational course catalog

### Relationships

- Users have many Skills
- Users have many Collabs (as creator or partner)
- Users have many RequestSessions
- Collabs belong to Users (creator and partner)
- RequestSessions belong to Users (requester and partner)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

## 👨‍💻 Author

**Yahia Anes**
- GitHub: [@yahiaAnes](https://github.com/yahiaAnes)

---

## 🙏 Acknowledgments

- Laravel community for the excellent framework
- Inertia.js team for seamless SPA integration
- Filament team for the beautiful admin panel
- All open-source contributors whose packages made this possible

---

**Happy Learning with LearnMate! 🎓✨**
