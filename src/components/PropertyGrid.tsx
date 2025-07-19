import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";

// Mock data for Lagos, Nigeria
const mockProperties = [
  {
    id: 1,
    title: "Modern 3-Bedroom Apartment in Victoria Island",
    price: "₦180,000,000",
    location: "Victoria Island, Lagos",
    bedrooms: 3,
    bathrooms: 3,
    area: 1400,
    type: "sale" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    agent: {
      name: "Adebayo Olumide",
      phone: "+234 802 123 4567",
      email: "adebayo@lagoshomes.ng"
    },
    isLuxury: false
  },
  {
    id: 2,
    title: "Luxury 5-Bedroom Mansion in Ikoyi",
    price: "₦450,000,000",
    location: "Ikoyi, Lagos",
    bedrooms: 5,
    bathrooms: 6,
    area: 4200,
    type: "sale" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    agent: {
      name: "Chioma Okechukwu",
      phone: "+234 803 987 6543",
      email: "chioma@luxurylagos.ng"
    },
    isLuxury: true
  },
  {
    id: 3,
    title: "2-Bedroom Flat in Lekki Phase 1",
    price: "₦2,500,000/year",
    location: "Lekki Phase 1, Lagos",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: "rent" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    agent: {
      name: "Funmi Adebisi",
      phone: "+234 805 456 7890",
      email: "funmi@lekkirentals.ng"
    },
    isLuxury: false
  },
  {
    id: 4,
    title: "Waterfront Penthouse in Banana Island",
    price: "₦800,000,000",
    location: "Banana Island, Lagos",
    bedrooms: 4,
    bathrooms: 5,
    area: 3500,
    type: "sale" as const,
    status: "sold" as const,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    agent: {
      name: "Emeka Nwosu",
      phone: "+234 806 321 9876",
      email: "emeka@eliteproperties.ng"
    },
    isLuxury: true
  },
  {
    id: 5,
    title: "1-Bedroom Studio in Yaba",
    price: "₦800,000/year",
    location: "Yaba, Lagos",
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    type: "rent" as const,
    status: "rented" as const,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    agent: {
      name: "Kemi Ogundimu",
      phone: "+234 807 654 3210",
      email: "kemi@yabarentals.ng"
    },
    isLuxury: false
  },
  {
    id: 6,
    title: "4-Bedroom Duplex in Magodo",
    price: "₦120,000,000",
    location: "Magodo, Lagos",
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    type: "sale" as const,
    status: "available" as const,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    agent: {
      name: "Tunde Bakare",
      phone: "+234 808 789 0123",
      email: "tunde@magodohomes.ng"
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