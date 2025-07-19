import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Coffee, ShoppingBag, GraduationCap, Hospital } from "lucide-react";

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
              
              {/* Interactive Map Placeholder */}
              <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23000%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2220%22%20cy=%2220%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                
                <div className="text-center z-10">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Interactive Map Coming Soon
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Connect your Google Maps API to enable interactive property mapping with real-time directions and amenity discovery.
                  </p>
                  <Button variant="outline">
                    Setup Google Maps API
                  </Button>
                </div>

                {/* Mock Map Pins */}
                <div className="absolute top-1/4 left-1/3 bg-destructive text-destructive-foreground rounded-full p-2 shadow-card animate-pulse">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="absolute top-1/2 right-1/4 bg-success text-success-foreground rounded-full p-2 shadow-card animate-pulse delay-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="absolute bottom-1/3 left-1/2 bg-primary text-primary-foreground rounded-full p-2 shadow-card animate-pulse delay-700">
                  <MapPin className="h-4 w-4" />
                </div>
              </div>
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