# 📡 Social Network API

A full-stack backend API for a social network app where users can post thoughts, react to others’ thoughts, and manage their friend lists. Built using **Express.js**, **MongoDB**, and **Mongoose**, with modular routing and testing using **Vitest**.

---

## 🚀 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Walkthrough Video](#walkthrough-video)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## 📦 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/social-network-api.git
   cd social-network-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root and add:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/socialmedia
   ```

4. Build the project:
   ```bash
   npm run build
   ```

---

## 💻 Usage

Start the server with:

```bash
npm start
```

Once the server is running, test the API using **Insomnia** or **Postman**.

---

## 📡 API Routes

### 🔹 Users
- `GET /api/users` – Get all users
- `GET /api/users/:userId` – Get a single user (with thoughts & friends)
- `POST /api/users` – Create a new user
- `PUT /api/users/:userId` – Update a user
- `DELETE /api/users/:userId` – Delete a user (and cascade delete their thoughts)

#### 🧑‍🤝‍🧑 Friends
- `POST /api/users/:userId/friends/:friendId` – Add a friend
- `DELETE /api/users/:userId/friends/:friendId` – Remove a friend

---

### 🔹 Thoughts
- `GET /api/thoughts` – Get all thoughts
- `GET /api/thoughts/:thoughtId` – Get a single thought
- `POST /api/thoughts` – Create a new thought
- `PUT /api/thoughts/:thoughtId` – Update a thought
- `DELETE /api/thoughts/:thoughtId` – Delete a thought

#### 💬 Reactions
- `POST /api/thoughts/:thoughtId/reactions` – Add a reaction
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` – Remove a reaction

---

## 🧠 Models

### User
- `username`: String (required, unique)
- `email`: String (required, valid email)
- `thoughts`: Array of Thought references
- `friends`: Array of User references
- **Virtual:** `friendCount`

### Thought
- `thoughtText`: String (1–280 characters)
- `createdAt`: Date (formatted with getter)
- `username`: Creator’s username
- `reactions`: Array of reaction subdocuments
- **Virtual:** `reactionCount`

### Reaction (Schema Only)
- `reactionBody`, `username`, `createdAt`
- Auto-generated `_id`

---

## 🎥 Walkthrough Video

> 📹 **COMING SOON**  
> A full walkthrough using Insomnia will be included here.

---

## 🛠 Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB & Mongoose
- Vitest (for testing)
- Insomnia (for route testing)

---

## 📜 License

This project is part of the UCF Full Stack Web Development Bootcamp.  
© 2024 edX Boot Camps LLC and Alex. All rights reserved.

