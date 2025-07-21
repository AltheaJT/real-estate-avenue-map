import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu, Heart, MapPin } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Real Estate Tech</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by location, property type..."
                className="pl-10 bg-muted/50 border-0 focus:bg-background"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Buy
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Rent
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Sell
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Agents
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hidden md:flex">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="default" className="hidden md:flex" onClick={() => navigate('/list-property')}>
                  List Property
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="hidden md:flex" onClick={() => navigate('/auth')}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="default" className="hidden md:flex" onClick={() => navigate('/auth')}>
                  Sign Up
                </Button>
                <Button variant="default" className="hidden md:flex" onClick={() => navigate('/list-property')}>
                  List Property
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search properties..."
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>

              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Buy
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Rent
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Sell
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Agents
              </a>
              
              <div className="pt-4 space-y-2">
                {user ? (
                  <>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button variant="default" className="w-full" onClick={() => navigate('/list-property')}>
                      List Property
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={signOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/auth')}>
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                    <Button variant="default" className="w-full" onClick={() => navigate('/auth')}>
                      Sign Up
                    </Button>
                    <Button variant="default" className="w-full" onClick={() => navigate('/list-property')}>
                      List Property
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;