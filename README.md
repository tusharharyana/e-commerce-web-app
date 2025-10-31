# ShopSmart - E-commerce Application

A modern, full-featured e-commerce application built with Next.js 16, TypeScript, MongoDB, and Tailwind CSS. Features server-side rendering, client-side interactivity, and comprehensive admin management.

## Screenshots
![alt text](/ecommerce-app/assets/image.png)
![alt text](/ecommerce-app/assets/image-1.png)
![alt text](/ecommerce-app/assets/image-2.png)
![alt text](/ecommerce-app/assets/image-3.png)
![alt text](/ecommerce-app/assets/image-4.png)
![alt text](/ecommerce-app/assets/image-5.png)
![alt text](/ecommerce-app/assets/image-6.png)
![alt text](/ecommerce-app/assets/image-7.png)
![alt text](/ecommerce-app/assets/image-8.png)

## 🚀 Features

- **Next.js App Router** with different rendering strategies (SSG, ISR, SSR, CSR)
- **MongoDB Integration** with Mongoose for data persistence
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **JWT Authentication** for admin access
- **RESTful API Routes** for CRUD operations
- **Client-side Search & Filtering**
- **Admin Dashboard** with product management
- **Responsive Design** for all devices

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Styling:** Tailwind CSS with custom components

## Project Structure

```
ecommerce-app/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   └── products/          # Product CRUD endpoints
│   ├── admin/                 # Admin pages
│   ├── dashboard/             # Public dashboard
│   ├── products/              # Product detail pages
│   ├── recommendations/       # Recommendations page
│   ├── components/            # Reusable components
│   ├── lib/                   # Database and utility functions
│   └── models/                # MongoDB schemas
├── public/                    # Static assets
└── middleware.ts              # Route protection
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tusharharyana/e-commerce-web-app.git
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start MongoDB**

   Make sure MongoDB is running.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Admin Access

- **URL:** `/admin/login`
- **Username:** `admin@example.com`
- **Password:** `123456`

## Rendering Strategies

- **Home Page:** ISR (Incremental Static Regeneration) - rebuilds every 60 seconds
- **Product Detail:** SSR (Server-Side Rendering) - fresh data on each request
- **Dashboard:** SSR with force-dynamic - no caching for real-time data
- **Recommendations:** ISR - rebuilds every 5 minutes
- **Admin Pages:** CSR (Client-Side Rendering) - interactive forms

## 🧪 Testing

Build for production:
```bash
npm run build
```


## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin only)
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)
- `GET /api/products/slug/[slug]` - Get product by slug

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile (protected)
- `POST /api/auth/register` - Register new admin

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, please open an issue on GitHub.
