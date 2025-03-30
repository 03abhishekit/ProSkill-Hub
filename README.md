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



