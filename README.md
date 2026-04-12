# 🌍 Meridian - Exclusive Travel Experiences

**Meridian** is a premium, full-stack travel booking and listing platform designed to connect travelers with extraordinary stays and experiences globally. Built with the robust **MEN Stack** (MongoDB, Express.js, Node.js), Meridian offers a seamless, visually stunning, and highly interactive user experience.

![Meridian Banner](https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

**Live Demo** - https://meridian-b8dk.onrender.com
---

## ✨ Features

- 🔐 **Premium Authentication**: Secure user login and signup powered by Passport.js with session management.
- 🏠 **Listing Management**: Users can create, edit, and delete their own travel listings with high-quality image uploads.
- 💬 **Interactive Review System**: Share travel experiences through a sophisticated review and rating interface.
- 🖼️ **Cloud-Powered Media**: Seamless image handling using Cloudinary and Multer for optimized listing visuals.
- 🌓 **Dynamic Aesthetics**: Includes a premium Dark Mode, smooth scrolling effects, and modern UI components.
- 📱 **Mobile Responsive**: Fully optimized for a consistent experience across desktops, tablets, and smartphones.
- ⚡ **Real-time Feedback**: Professional SweetAlert2 modals for intuitive user alerts and confirmations.

---

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB & Mongoose**: Database and ODM
- **Passport.js**: Authentication strategy
- **Cloudinary**: Cloud-based image management

### Frontend
- **EJS**: Embedded JavaScript templates
- **CSS3**: Custom premium styling with Glassmorphism and modern layouts
- **JavaScript**: Client-side interactivity and smooth scrolling
- **SweetAlert2**: Beautiful alert modals

---

## 📂 Project Structure

```text
MAJOR_PROJECT/
├── controllers/    # Route controllers (MVC logic)
├── models/         # Mongoose schemas (Listing, Review, User)
├── public/         # Static assets (CSS, JS, Images)
├── routes/         # Express routers
├── utils/          # Helper functions and Error handling
├── views/          # EJS templates (Pages, Layouts, Partials)
├── app.js          # Main application entry point
├── cloudConfig.js  # Cloudinary configuration
├── schema.js       # Joi validation schemas
└── .env            # Environment variables
```

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js (v22.17.0 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iabhinavsinghrajput/Meridian.git
   ```

2. **Install NPM packages**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_api_key
   CLOUD_API_SECRET=your_api_secret
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   ```

4. **Run the application**
   ```bash
   node app.js
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🤝 Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License.

---


**Developed with ❤️ by [Abhinav Kumar](https://github.com/iabhinavsinghrajput)**
