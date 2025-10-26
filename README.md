# Boosla - AI-Powered Delivery Management Platform

A comprehensive delivery management system with AI-powered features for last-mile delivery optimization.

## Features

- **Warehouse Management**: Complete warehouse and pickup point management
- **Zone Management**: Geographic zone assignment with automatic warehouse-to-zone mapping
- **Driver Management**: Driver assignment and tracking
- **Order Management**: Order processing and delivery optimization
- **Real-time Tracking**: Live delivery status updates
- **Bilingual Support**: Arabic and English interface

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Maps**: Mapbox integration
- **Authentication**: Supabase Auth

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Boosla-AI-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up the database**
   - Go to your Supabase dashboard
   - Run the SQL scripts to create tables:
     - Create `users` table
     - Create `zones` table  
     - Create `drivers` table
     - Create `warehouses` table
     - Add `zone_id` to warehouses: `ALTER TABLE warehouses ADD COLUMN zone_id UUID REFERENCES zones(id);`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── drivers/             # Driver management API
│   │   ├── zones/               # Zone management API
│   │   └── warehouses/          # Warehouse management API
│   └── products/boosla/dashboard/ # Main dashboard
│       ├── drivers/             # Driver management UI
│       ├── zones/               # Zone management UI
│       └── warehouses/          # Warehouse management UI
├── components/                   # Reusable components
├── lib/                         # Utility libraries
└── hooks/                       # Custom React hooks
```

## Key Features

### Warehouse Management
- Add/edit warehouses with location coordinates
- Automatic zone assignment based on coordinates
- Warehouse capacity tracking
- Contact information management

### Zone Management  
- Geographic zone creation and editing
- Interactive map integration
- Zone-to-warehouse assignment
- Delivery area optimization

### Driver Management
- Driver registration and profiles
- Zone assignment for drivers
- Performance tracking
- Contact management

## API Endpoints

- `GET /api/warehouses` - Get all warehouses
- `POST /api/warehouses` - Create new warehouse
- `GET /api/zones` - Get all zones
- `POST /api/zones` - Create new zone
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Create new driver

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
