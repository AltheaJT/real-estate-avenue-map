import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Real Estate Tech</span>
              </div>
              <p className="text-background/80 mb-6 leading-relaxed">
                Your trusted partner in finding the perfect property. Connecting buyers, 
                sellers, and renters with professional real estate agents across the country.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Buy Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Rent Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Sell Your Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Find Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Market Insights
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Neighborhood Guides
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Property Management
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Home Valuation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Mortgage Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Investment Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Legal Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-background transition-colors">
                    Moving Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-background/80" />
                  <span className="text-background/80">+234 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-background/80" />
                  <span className="text-background/80">info@realestatepro.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-background/80 mt-1" />
                  <span className="text-background/80">
                    Augustine University, Ilara-Epe<br />
                    Epe, Lagos, Nigeria
                  </span>
                </div>
              </div>

              <div>
                <p className="text-background/80 text-sm mb-4">
                  Subscribe to our newsletter for market updates and new listings.
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/60 focus:bg-background/15"
                  />
                  <Button variant="outline" className="border-background/20 text-background hover:bg-background hover:text-foreground">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2025 Real Estate Tech. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;