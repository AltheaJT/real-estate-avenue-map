import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-accent to-luxury bg-clip-text text-transparent">
              Home in Lagos
            </span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover premium properties across Lagos, Nigeria. From Victoria Island to Lekki, 
            connect with trusted agents and find your dream home today.
          </p>

          {/* Search Form */}
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-luxury max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Lagos Area (e.g., Victoria Island, Lekki)"
                  className="pl-10 h-12 border-0 bg-muted/50 focus:bg-background"
                />
              </div>
              
              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:bg-background">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:bg-background">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50m">₦0 - ₦50M</SelectItem>
                  <SelectItem value="50m-100m">₦50M - ₦100M</SelectItem>
                  <SelectItem value="100m-200m">₦100M - ₦200M</SelectItem>
                  <SelectItem value="200m-500m">₦200M - ₦500M</SelectItem>
                  <SelectItem value="500m+">₦500M+</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="hero" size="lg" className="h-12">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                5,000+ Lagos Properties
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Market Updates Daily
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Interactive Maps
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" className="bg-background/20 border-primary-foreground/20 text-primary-foreground hover:bg-background/30">
              Browse Homes for Sale
            </Button>
            <Button variant="outline" size="lg" className="bg-background/20 border-primary-foreground/20 text-primary-foreground hover:bg-background/30">
              Find Rental Properties
            </Button>
            <Button variant="accent" size="lg" onClick={() => window.location.href = '/auth'}>
              List Your Property
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;