@echo off
echo Starting project setup...

REM Create new Angular project
REM call ng new task-management --routing true --style scss --standalone true --defaults

REM Navigate to project directory
REM cd task-management

REM Create directory structure
mkdir src\app\core\services
mkdir src\app\core\guards
mkdir src\app\core\interceptors
mkdir src\app\core\models
mkdir src\app\shared\ui
mkdir src\app\shared\pipes
mkdir src\app\features\auth\components
mkdir src\app\features\dashboard\components
mkdir src\app\features\tasks\components

REM Generate Core Services
call ng generate service core/services/auth --skip-tests
call ng generate service core/services/task --skip-tests
call ng generate service core/services/user --skip-tests

REM Generate Guards
call ng generate guard core/guards/auth --functional --skip-tests

REM Generate Interceptors
call ng generate interceptor core/interceptors/auth --skip-tests

REM Generate Interfaces
call ng generate interface core/models/task
call ng generate interface core/models/user

REM Generate Shared UI Components
call ng generate component shared/ui/button --standalone --skip-tests
call ng generate component shared/ui/card --standalone --skip-tests
call ng generate pipe shared/pipes/task-priority --standalone --skip-tests

REM Generate Auth Feature
call ng generate component features/auth/components/login --standalone --skip-tests
call ng generate component features/auth/components/register --standalone --skip-tests
call ng generate route features/auth --module=app.routes

REM Generate Dashboard Feature
call ng generate component features/dashboard/components/task-stats --standalone --skip-tests
call ng generate component features/dashboard/components/recent-activity --standalone --skip-tests
call ng generate component features/dashboard/dashboard --standalone --skip-tests
call ng generate route features/dashboard --module=app.routes

REM Generate Tasks Feature
call ng generate component features/tasks/components/task-list --standalone --skip-tests
call ng generate component features/tasks/components/task-card --standalone --skip-tests
call ng generate component features/tasks/components/task-form --standalone --skip-tests
call ng generate route features/tasks --module=app.routes

REM Generate environments
call ng generate environments

REM Install additional dependencies
call npm install @angular/material @angular/cdk
call npm install date-fns
call npm install chart.js

REM Add Angular Material
call ng add @angular/material --theme=custom --typography=true --animations=true --skip-confirmation

REM Optional: Add Tailwind CSS
call ng add @ngneat/tailwind --skip-confirmation

REM Build the project
call ng build

echo Project setup complete! 
pause