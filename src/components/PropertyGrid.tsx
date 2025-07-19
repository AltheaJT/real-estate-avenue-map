import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Condo with City Views",
    price: "$450,000",
    location: "Downtown Seattle, WA",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "sale" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@realestatecloud.com"
    },
    isLuxury: false
  },
  {
    id: 2,
    title: "Luxury Villa with Pool and Garden",
    price: "$1,250,000",
    location: "Beverly Hills, CA",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    type: "sale" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    agent: {
      name: "Michael Chen",
      phone: "(555) 987-6543",
      email: "michael@luxuryestates.com"
    },
    isLuxury: true
  },
  {
    id: 3,
    title: "Charming Suburban Family Home",
    price: "$2,800",
    location: "Austin, TX",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "rent" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    agent: {
      name: "Emily Rodriguez",
      phone: "(555) 456-7890",
      email: "emily@homefinders.com"
    },
    isLuxury: false
  },
  {
    id: 4,
    title: "Waterfront Penthouse with Panoramic Views",
    price: "$3,200,000",
    location: "Miami Beach, FL",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: "sale" as const,
    status: "sold" as const,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    agent: {
      name: "David Martinez",
      phone: "(555) 321-9876",
      email: "david@oceanview.com"
    },
    isLuxury: true
  },
  {
    id: 5,
    title: "Cozy Studio Apartment in Arts District",
    price: "$1,850",
    location: "Portland, OR",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: "rent" as const,
    status: "rented" as const,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    agent: {
      name: "Jessica Liu",
      phone: "(555) 654-3210",
      email: "jessica@cityrentals.com"
    },
    isLuxury: false
  },
  {
    id: 6,
    title: "Historic Brownstone with Original Details",
    price: "$875,000",
    location: "Brooklyn, NY",
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    type: "sale" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    agent: {
      name: "Robert Thompson",
      phone: "(555) 789-0123",
      email: "robert@heritage.com"
    },
    isLuxury: false
  }
];

const PropertyGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties available for sale and rent. 
            Each listing includes detailed information and direct agent contact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;