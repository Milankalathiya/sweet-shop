# ?? Sweet Shop - Full Stack E-commerce Application 
 
A full-stack e-commerce platform for a sweet shop featuring a Spring Boot backend and React frontend. 
 
## ?? Features 
 
### Frontend 
- **Modern UI** built with React and TypeScript 
- **Responsive Design** for all device sizes 
- **Product Catalog** with categories and search 
- **Shopping Cart** functionality 
- **Admin Dashboard** for product management 
- **User Authentication** with JWT 
 
### Backend 
- **RESTful API** with Spring Boot 
- **JWT Authentication** 
- **MongoDB** database 
- **Product Management** CRUD operations 
- **Order Processing** 
 
## ??? Tech Stack 
 
### Frontend 
- React 18 with TypeScript 
- Vite for build tooling 
- TailwindCSS for styling 
- React Query for data fetching 
- React Router for navigation 
 
### Backend 
- Java 17 
- Spring Boot 3.x 
- Spring Security with JWT 
- MongoDB 
- Maven for dependency management 
 
## ?? Getting Started 
 
### Prerequisites 
 
- Java 17 or higher 
- Node.js 18+ 
- MongoDB (local or Atlas) 
- Maven 
 
### Installation 
 
1. **Clone the repository** 
   ```bash 
   git clone [https://github.com/Milankalathiya/sweet-shop.git](https://github.com/Milankalathiya/sweet-shop.git) 
   cd sweet-shop 
   ``` 
 
2. **Backend Setup** 
   ```bash 
   cd Sweet-Shop-Backend 
   mvn clean install 
   ``` 
 
3. **Frontend Setup** 
   ```bash 
   cd ../Sweet-Shop-Frontend/client 
   npm install 
   ``` 
 
4. **Environment Configuration** 
   - Create `application.properties` in `src/main/resources`: 
     ```properties 
     server.port=8080 
     spring.data.mongodb.uri=mongodb://localhost:27017/sweetshop 
     jwt.secret=your_jwt_secret 
     ``` 
 
5. **Run the Application** 
   - Start MongoDB service 
   - Backend: `mvn spring-boot:run` (from backend directory) 
   - Frontend: `npm run dev` (from frontend directory) 
 
## ?? Project Structure 
 
``` 
sweet-shop/ 
ÃÄÄ Sweet-Shop-Backend/       # Spring Boot backend 
³   ÃÄÄ src/ 
³   ³   ÃÄÄ main/ 
³   ³   ³   ÃÄÄ java/com/sweetshop/ 
³   ³   ³   ³   ÃÄÄ config/    # Configuration classes 
³   ³   ³   ³   ÃÄÄ controller/# REST controllers 
³   ³   ³   ³   ÃÄÄ model/     # Data models 
³   ³   ³   ³   ÃÄÄ repository/# Data access 
³   ³   ³   ³   ÃÄÄ security/  # Security config 
³   ³   ³   ³   ÀÄÄ service/   # Business logic 
³   ³   ³   ÀÄÄ resources/     # Properties and static files 
³   ³   ÀÄÄ test/             # Test files 
³   ÀÄÄ pom.xml              # Maven configuration 
³ 
ÀÄÄ Sweet-Shop-Frontend/     # React frontend 
    ÀÄÄ client/ 
        ÃÄÄ public/          # Static files 
        ÀÄÄ src/ 
            ÃÄÄ components/  # Reusable components 
            ÃÄÄ pages/       # Page components 
            ÃÄÄ services/    # API services 
            ÀÄÄ App.tsx      # Main component 
``` 
 
## ?? Testing 
 
### Backend Tests 
```bash 
cd Sweet-Shop-Backend 
mvn test 
``` 
 
### Frontend Tests 
```bash 
cd Sweet-Shop-Frontend/client 
npm test 
``` 
 
## ?? Deployment 
 
### Backend (Spring Boot) 
1. Build the JAR: 
   ```bash 
   cd Sweet-Shop-Backend 
   mvn clean package -DskipTests 
   ``` 
2. Run the JAR: 
   ```bash 
   java -jar target/sweet-shop-0.0.1-SNAPSHOT.jar 
   ``` 
 
### Frontend (Vercel/Netlify) 
1. Build for production: 
   ```bash 
   cd Sweet-Shop-Frontend/client 
   npm run build 
   ``` 
2. Deploy the `dist` folder to your preferred platform 
 
## ?? My AI Usage 
 
### Tools Used 
- **GitHub Copilot**: For code completion and suggestions 
- **ChatGPT**: For debugging and architectural decisions 
- **ESLint/Prettier**: For code quality 
 
### How AI Assisted 
- **Backend Development**: Helped with Spring Boot configurations and MongoDB integration 
- **Frontend Development**: Assisted with React hooks and state management 
- **Troubleshooting**: Debugged complex issues in the authentication flow 
- **Documentation**: Generated initial documentation and code comments 
 
### Impact 
- **Efficiency**: Reduced development time significantly 
- **Code Quality**: Improved with best practices 
- **Learning**: Enhanced understanding of Spring Security and React patterns 
 
## ?? License 
 
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
 
## ?? Acknowledgments 
 
- [Spring Boot](https://spring.io/projects/spring-boot) for the powerful backend framework 
- [React](https://reactjs.org/) for the component-based frontend 
- [Vite](https://vitejs.dev/) for the fast development experience 
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework 
 
--- 
 
Made with ?? by [Milan Kalathiya](https://github.com/Milankalathiya) 
