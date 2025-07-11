---

# Locopro

**Locopro** is a responsive real estate listing platform built with **Next.js**, **Firebase**, and **Tailwind CSS**. Inspired by platforms like Zameen.com, it allows users to browse, filter, and manage property listings. It also includes secure authentication, an admin dashboard, and listing control for agencies or property managers.

Live Site: [https://locopro-client.vercel.app](https://locopro-client.vercel.app)  
GitHub Repo: [https://github.com/LaeeqtheDev/locopro-client](https://github.com/LaeeqtheDev/locopro-client)

---

## ✨ Features

* Property listing cards with image galleries, price, and location  
* Search and filter by city, area, and price range  
* Firebase Auth for user login and protected routes  
* Admin dashboard to manage, approve, and delete listings  
* Real-time database updates via Firestore  
* Clean UI with responsive layout using TailwindCSS  
* Role-based views for regular users and admins  
* Form validation and toast notifications for actions  
* Deployment-ready build with Vercel

---

## 🧱 Folder Structure

* `src/components/` – Reusable components (PropertyCard, SearchBar, Layout, etc.)  
* `src/pages/` – Page routes including Home, Listing Details, Admin Dashboard  
* `src/lib/` – Firebase config and utility functions  
* `src/styles/` – Global styles and Tailwind configuration  
* `firebase.config.ts` – Firestore and Auth setup  
* `middleware.ts` – Route protection and admin gating logic

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```

git clone [https://github.com/LaeeqtheDev/locopro-client.git](https://github.com/LaeeqtheDev/locopro-client.git)
cd locopro-client

```

### 2. Install dependencies

```

npm install

```

### 3. Create `.env.local`

Add the following Firebase config keys:

```

NEXT\_PUBLIC\_FIREBASE\_API\_KEY=
NEXT\_PUBLIC\_FIREBASE\_AUTH\_DOMAIN=
NEXT\_PUBLIC\_FIREBASE\_PROJECT\_ID=
NEXT\_PUBLIC\_FIREBASE\_STORAGE\_BUCKET=
NEXT\_PUBLIC\_FIREBASE\_MESSAGING\_SENDER\_ID=
NEXT\_PUBLIC\_FIREBASE\_APP\_ID=

```

### 4. Run development server

```

npm run dev

```

Visit [http://localhost:3000](http://localhost:3000) to see it live.

---

## 💡 Customization Ideas

* Add geolocation support and Google Maps integration  
* Implement booking requests or chat system  
* Add featured listings or promotional packages  
* Extend admin panel with analytics dashboard  

---

## 🧑 Author

Made with 🔨 by [Syed Laeeq Ahmed](https://www.linkedin.com/in/syed-laeeq-ahmed/)

* 📬 Email: [laeeqahmed656@gmail.com](mailto:laeeqahmed656@gmail.com)  
* 🧑‍💻 GitHub: [github.com/LaeeqtheDev](https://github.com/LaeeqtheDev)

---

## 🌍 Deployment

* Frontend hosted via [Vercel](https://vercel.com)  
* Firebase handles backend services: Auth, Firestore, and Hosting (optional)

---

## 📄 License

Open for learning, portfolio use, and customization. Commercial use is allowed with credit to the original author.

---
