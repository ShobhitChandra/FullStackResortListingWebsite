# 🌴 Resort Haven - Full-Stack Resort Listing Platform

![Resort Haven Demo](https://example.com/path-to-demo-gif.gif) <!-- Add a demo gif/image if available -->

A comprehensive resort discovery platform where users can explore, rate, and book resorts worldwide. Features advanced search capabilities with country and category filters, user authentication, interactive maps, and a robust review system.

## ✨ Key Features

### 🔍 Discovery & Search
- **Multi-filter Search** - Filter by country, category
- **Interactive Map View** - Visualize resorts using Mapbox integration

### 👥 User Experience
- **Secure Authentication** - Passport.js local strategy with password hashing
- **Rating System** - Star-based reviews with Starability.css styling
- **Image Gallery** - Cloudinary-powered image uploads for listings

### 🛠️ Technical Highlights
- MVC architecture with clean separation of concerns
- RESTful routing with proper HTTP verb usage
- Responsive design with Bootstrap 5
- Flash messages for user feedback
- Server-side form validation

## 🛠️ Technology Stack

### Backend
| Component       | Technology                          |
|-----------------|-------------------------------------|
| Server          | Node.js with Express.js             |
| Database        | MongoDB with Mongoose ODM           |
| Authentication  | Passport.js (Local Strategy)        |
| File Uploads    | Multer + Cloudinary                 |
| Geocoding       | Mapbox Geocoding API                |
| Templating      | EJS with EJS-Mate layouts           |

### Frontend
| Component       | Technology                          |
|-----------------|-------------------------------------|
| Styling         | Bootstrap 5 + Custom CSS            |
| Icons           | Font Awesome                        |
| Ratings         | Starability.css                     |
| Maps            | Mapbox GL JS                        |
| Client-side JS  | Vanilla JavaScript                  |

## 🏗️ Project Structure (MVC)

\`\`\`
resort-haven/
├── controllers/          # Business logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/               # Database models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/                # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/               # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── routes/               # Route definitions
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── utils/                # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
└── middleware.js         # Custom middleware
\`\`\`

## 🌐 API Endpoints

### Listings Resource
| Method | Endpoint                | Description                          | Auth Required |
|--------|-------------------------|--------------------------------------|---------------|
| GET    | /listings               | Get all listings                     | No            |
| POST   | /listings               | Create new listing                   | Yes           |
| GET    | /listings/:id           | Get single listing                   | No            |
| PUT    | /listings/:id           | Update listing                       | Yes (Owner)   |
| DELETE | /listings/:id           | Delete listing                       | Yes (Owner)   |
| GET    | /listings/country/:name | Filter by country                    | No            |
| GET    | /listings/category/:id  | Filter by category                   | No            |

### Users Resource
| Method | Endpoint   | Description                | Auth Required |
|--------|------------|----------------------------|---------------|
| POST   | /signup    | Register new user          | No            |
| POST   | /login     | User login                 | No            |
| GET    | /logout    | User logout                | Yes           |

### Reviews Resource
| Method | Endpoint                     | Description          | Auth Required |
|--------|------------------------------|----------------------|---------------|
| POST   | /listings/:id/reviews        | Add review           | Yes           |
| DELETE | /listings/:id/reviews/:revId | Delete review        | Yes (Author)  |

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account for image storage
- Mapbox account for geocoding

### Installation Steps
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/resort-haven.git
   cd resort-haven
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a \`.env\` file in root directory with:
   \`\`\`env
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_key
   CLOUD_API_SECRET=your_cloudinary_secret
   MAP_TOKEN=your_mapbox_token
   DB_URL=mongodb://localhost:27017/resort-haven
   SESSION_SECRET=your_session_secret
   \`\`\`

4. Seed initial data (optional):
   \`\`\`bash
   node init/data.js
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

6. Access the app at:
   \`\`\`
   http://localhost:3000
   \`\`\`

## 📚 Documentation

- [Mongoose Schemas](docs/schemas.md)
- [API Reference](docs/api.md)
- [Frontend Components](docs/components.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## ✉️ Contact

Shobhitchandra Chaudhari .
