import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TripFormInputs } from "@/components/trip/TripFormInputs";
import { Plane } from "lucide-react";

export interface TripData {
  fromDate: Date;
  toDate: Date;
  numPeople: number;
  budget: number;
  budgetPerPerson: boolean;
  destination: string;
  transport: string[];
  activities: string[];
  accommodation: string;
  pace: string;
  includeEvents: boolean;
  kidFriendly: boolean;
}

const Plan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const [tripData, setTripData] = useState<TripData>({
    fromDate: new Date(),
    toDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    numPeople: 2,
    budget: 2000,
    budgetPerPerson: false,
    destination: "",
    transport: ["Public Transport"],
    activities: ["Sightseeing"],
    accommodation: "Mid-range Hotel",
    pace: "Moderate",
    includeEvents: false,
    kidFriendly: false,
  });

  const handleGenerate = async () => {
    if (!tripData.destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination for your trip",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("currentTrip", JSON.stringify(tripData));
      setIsGenerating(false);
      toast({
        title: "Itinerary generated!",
        description: "Your personalized travel plan is ready",
      });
      navigate("/results");
    }, 2000);
  };

  const handleReset = () => {
    setTripData({
      fromDate: new Date(),
      toDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      numPeople: 2,
      budget: 2000,
      budgetPerPerson: false,
      destination: "",
      transport: ["Public Transport"],
      activities: ["Sightseeing"],
      accommodation: "Mid-range Hotel",
      pace: "Moderate",
      includeEvents: false,
      kidFriendly: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-4xl py-8 px-4">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
              <Plane className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Plan Your Trip</h1>
          <p className="text-muted-foreground text-lg">
            Tell us about your dream vacation and we'll create a perfect itinerary
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>
              Fill in your travel preferences to generate a customized day-by-day itinerary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TripFormInputs tripData={tripData} setTripData={setTripData} />

            <div className="flex gap-4 mt-8">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Generating your itinerary...
                  </>
                ) : (
                  "Generate Itinerary"
                )}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                Reset
              </Button>
            </div>

            {isGenerating && (
              <p className="text-sm text-center text-muted-foreground mt-4">
                ⏱️ Estimated time: 15-30 seconds
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Plan;
