import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ListProperty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    area: "",
    address: "",
    property_type: "",
    listing_type: "",
    bedrooms: "",
    bathrooms: "",
    area_sqm: "",
    furnishing: "",
    amenities: "",
    nearby_landmarks: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a property",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get user's profile to check if they're an agent
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        throw new Error('Profile not found');
      }

      let agentId = null;
      let landlordId = null;

      if (profile.role === 'agent') {
        // Get agent record
        const { data: agent } = await supabase
          .from('agents')
          .select('id')
          .eq('profile_id', profile.id)
          .single();
        
        if (agent) agentId = agent.id;
      } else {
        landlordId = profile.id;
      }

      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: formData.location,
        area: formData.area,
        address: formData.address || null,
        property_type: formData.property_type as 'apartment' | 'house' | 'duplex' | 'penthouse' | 'commercial' | 'land',
        listing_type: formData.listing_type as 'sale' | 'rent',
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area_sqm: formData.area_sqm ? parseInt(formData.area_sqm) : null,
        furnishing: formData.furnishing || null,
        amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : null,
        nearby_landmarks: formData.nearby_landmarks ? formData.nearby_landmarks.split(',').map(l => l.trim()) : null,
        agent_id: agentId,
        landlord_id: landlordId,
      };

      const { error } = await supabase
        .from('properties')
        .insert(propertyData);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Property listed successfully",
      });

      navigate('/');
    } catch (error) {
      console.error('Error listing property:', error);
      toast({
        title: "Error",
        description: "Failed to list property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">List Your Property</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the details below to list your property
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Beautiful 3BR Apartment in Lagos"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price (₦) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="e.g., 5000000"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="property_type">Property Type *</Label>
                  <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="listing_type">Listing Type *</Label>
                  <Select value={formData.listing_type} onValueChange={(value) => handleInputChange('listing_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    placeholder="e.g., 3"
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    placeholder="e.g., 2"
                  />
                </div>

                <div>
                  <Label htmlFor="area_sqm">Area (sqm)</Label>
                  <Input
                    id="area_sqm"
                    type="number"
                    value={formData.area_sqm}
                    onChange={(e) => handleInputChange('area_sqm', e.target.value)}
                    placeholder="e.g., 120"
                  />
                </div>

                <div>
                  <Label htmlFor="furnishing">Furnishing</Label>
                  <Select value={formData.furnishing} onValueChange={(value) => handleInputChange('furnishing', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furnished">Fully Furnished</SelectItem>
                      <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Lekki, Lagos"
                  required
                />
              </div>

              <div>
                <Label htmlFor="area">Area/Neighborhood *</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="e.g., Phase 1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Complete address"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your property in detail..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input
                  id="amenities"
                  value={formData.amenities}
                  onChange={(e) => handleInputChange('amenities', e.target.value)}
                  placeholder="e.g., Swimming Pool, Gym, Security, Parking"
                />
              </div>

              <div>
                <Label htmlFor="nearby_landmarks">Nearby Landmarks (comma-separated)</Label>
                <Input
                  id="nearby_landmarks"
                  value={formData.nearby_landmarks}
                  onChange={(e) => handleInputChange('nearby_landmarks', e.target.value)}
                  placeholder="e.g., Mall, School, Hospital"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Listing..." : "List Property"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListProperty;