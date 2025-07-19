import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: "sale" | "rent";
    status: "available" | "sold" | "rented";
    image: string;
    agent: {
      name: string;
      phone: string;
      email: string;
    };
    isLuxury?: boolean;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success text-success-foreground";
      case "sold":
        return "bg-destructive text-destructive-foreground";
      case "rented":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className={`bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-300 transform hover:-translate-y-1 group ${property.isLuxury ? 'ring-2 ring-luxury/20' : ''}`}>
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlays */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={getStatusColor(property.status)} variant="secondary">
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
          {property.isLuxury && (
            <Badge className="bg-luxury text-luxury-foreground" variant="secondary">
              Luxury
            </Badge>
          )}
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            For {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 bg-background/90 hover:bg-background ${
            isFavorited ? 'text-destructive' : 'text-muted-foreground'
          }`}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 flex-1">
            {property.title}
          </h3>
          <div className="text-right ml-4">
            <p className="text-2xl font-bold text-primary">{property.price}</p>
            {property.type === "rent" && (
              <p className="text-sm text-muted-foreground">/month</p>
            )}
          </div>
        </div>

        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* Agent Information */}
        <div className="border-t border-border pt-4 mb-4">
          <p className="text-sm font-medium text-card-foreground mb-2">
            Listed by {property.agent.name}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{property.agent.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{property.agent.email}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
          <Button variant="default" className="flex-1">
            Contact Agent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;