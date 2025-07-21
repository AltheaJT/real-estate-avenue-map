import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Coffee, ShoppingBag, GraduationCap, Hospital } from "lucide-react";
import GoogleMap from "./GoogleMap";

const MapSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Neighborhoods
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our interactive map to discover properties and explore nearby amenities. 
            Get directions and see what makes each location special.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Enter address or location..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="default">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
              </div>
              
              {/* Interactive Map */}
              <GoogleMap />
            </div>
          </div>

          {/* Amenities Panel */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Nearby Amenities
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-accent" />
                    <span className="text-card-foreground">Coffee Shops</span>
                  </div>
                  <span className="text-sm text-muted-foreground">12 nearby</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5 text-accent" />
                    <span className="text-card-foreground">Shopping</span>
                  </div>
                  <span className="text-sm text-muted-foreground">8 nearby</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    <span className="text-card-foreground">Schools</span>
                  </div>
                  <span className="text-sm text-muted-foreground">5 nearby</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Hospital className="h-5 w-5 text-accent" />
                    <span className="text-card-foreground">Healthcare</span>
                  </div>
                  <span className="text-sm text-muted-foreground">3 nearby</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Map Features
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Property locations with photos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Turn-by-turn directions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Nearby amenities & services
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-luxury rounded-full"></div>
                  Neighborhood insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;