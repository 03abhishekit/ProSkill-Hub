# ProSkill Hub - Learning Platform Clone

## 📌 Project Overview
ProSkill Hub is a **full-stack learning platform** built using the **MERN (MongoDB, Express, React, Node.js) stack** with additional features like **Cloudinary for media storage, Stripe for payments, and Redux Toolkit for state management**. This project provides a seamless learning experience, allowing users to browse, enroll in, and watch courses.

## 🚀 Tech Stack

### **Backend (Node.js & Express.js)**
- **Node.js** - Runtime environment
- **Express.js** - Backend framework
- **MongoDB & Mongoose** - Database and ORM
- **Cloudinary** - Media storage (for course videos & images)
- **Multer** - File uploads
- **JWT (jsonwebtoken)** - Authentication
- **Stripe** - Payment processing

### **Frontend (React.js & Tailwind CSS)**
- **React.js** - Frontend framework
- **Redux Toolkit** - State management
- **Tiptap Core** - Rich text editor
- **Lucide-react** - Icons
- **Axios** - HTTP requests
- **React Player** - Video playback
- **React-Router-Dom** - Client-side routing
- **React-Toastify** - Notifications
- **Tailwind CSS** - Styling framework

---

## 🔧 Setup Instructions
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/03abhishekit/ProSkill-Hub.git
cd ProSkill-Hub
```

### **2️⃣ Backend Setup**
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### **3️⃣ Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file in the frontend directory and add:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```
4. Start the frontend server:
   ```sh
   npm run dev
   ```

---

## 🛠 Features
### **📝 Course Management**
✅ Create, update, and delete courses
✅ Upload course videos and thumbnails to Cloudinary
✅ Enroll and track course progress

### **👤 Authentication & Security**
✅ JWT-based authentication (Login, Register, Logout)
✅ Role-based access (Admin, Instructor, Student)
✅ Secure API endpoints

### **💳 Payment Integration (Stripe)**
✅ Checkout and purchase courses
✅ Secure payment processing
✅ Transaction history

### **📢 Notifications & User Experience**
✅ Toast notifications (React-Toastify)
✅ Video playback support (React-Player)
✅ Rich text editor (Tiptap)

---

## 🚀 Deployment
### **Backend Deployment (Vercel / Render)**
1. Deploy the backend on **Render** or **Vercel**.
2. Set the environment variables in the hosting provider.

### **Frontend Deployment (Vercel / Netlify)**
1. Build the frontend:
   ```sh
   npm run build
   ```
2. Deploy the `dist/` folder on **Vercel** or **Netlify**.

---

## 📜 API Endpoints
| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| POST   | `/api/auth/register`   | Register a new user             |
| POST   | `/api/auth/login`      | User login                      |
| GET    | `/api/courses`         | Get all courses                 |
| POST   | `/api/courses`         | Create a new course (Admin)     |
| GET    | `/api/courses/:id`     | Get course details              |
| POST   | `/api/payment`         | Handle Stripe payment           |

---

## 📌 Contribution Guide
We welcome contributions! 🚀
1. **Fork** the repository.
2. Create a **new branch**:
   ```sh
   git checkout -b feature-branch
   ```
3. Make changes and commit:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push the changes:
   ```sh
   git push origin feature-branch
   ```
5. Open a **Pull Request**!

---

## 📞 Contact
📧 **Email:** Kumarabhishek28147@gmail.com  
🔗 **GitHub:** [03abhishekit](https://github.com/03abhishekit)  
🔗 **LinkedIn:** [Abhishek Kumar](https://www.linkedin.com/in/abhishek6837/)








![Screenshot (72)](https://github.com/user-attachments/assets/dde20521-524e-4b6e-8795-5fa91716e979)


![Screenshot (73)](https://github.com/user-attachments/assets/0909e638-63e2-4fe4-9f2d-dc481943977f)


![Screenshot (73)](https://github.com/user-attachments/assets/57a9cdb3-5c38-4b48-a79f-e3ee5c78bd31)
![Screenshot (86)](https://github.com/user-attachments/assets/33b7407f-5642-4b43-b731-1a2e3efb9d96)
![Screenshot (85)](https://github.com/user-attachments/assets/6e27593e-7f8e-4470-8909-700c3ba9570f)
![Screenshot (84)](https://github.com/user-attachments/assets/1ae2a000-0548-4532-9fbb-f35849a4cca0)
![Screenshot (83)](https://github.com/user-attachments/assets/4029e4df-177d-41b6-bb0b-558b36cbbafd)
![Screenshot (82)](https://github.com/user-attachments/assets/6f0703b7-138b-4374-b46f-c4cdf291138c)
![Screenshot (81)](https://github.com/user-attachments/assets/2be1e7e5-2cc8-455a-80c3-528b83ad0c75)
![Screenshot (80)](https://github.com/user-attachments/assets/32946949-55cf-4bd1-b818-e19cecd0cb74)
![Screenshot (79)](https://github.com/user-attachments/assets/b7c28ab9-afb7-4eab-9b44-d625c82c5783)
![Screenshot (78)](https://github.com/user-attachments/assets/c8674744-f88f-4ed9-ad68-b93b2aa91898)
![Screenshot (77)](https://github.com/user-attachments/assets/72b216a3-1dd8-4b0f-a912-679261f641e4)
![Screenshot (76)](https://github.com/user-attachments/assets/f2cba867-7707-4c05-8f7d-ab9ac771fc80)
![Screenshot (75)](https://github.com/user-attachments/assets/1331852a-e0b6-4ba2-b4f3-ca7bd31388b9)
![Screenshot (74)](https://github.com/user-attachments/assets/a2140a76-041e-494d-a14d-d40f02cbda5d)

