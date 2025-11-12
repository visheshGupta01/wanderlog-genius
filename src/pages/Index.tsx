import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container max-w-6xl py-16 px-4">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized day-by-day itineraries with activities, weather forecasts, and budget planning
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/plan")} className="text-lg px-8">
              Start Planning
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: MapPin,
              title: "Smart Destinations",
              description: "AI-powered suggestions based on your preferences",
            },
            {
              icon: Calendar,
              title: "Day-by-Day Plans",
              description: "Detailed itineraries with time-slotted activities",
            },
            {
              icon: Users,
              title: "Group Travel",
              description: "Perfect for solo travelers, couples, or groups",
            },
            {
              icon: Sparkles,
              title: "Budget Tracking",
              description: "Stay on budget with cost estimates for each activity",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of travelers planning their dream vacations
          </p>
          <Button size="lg" onClick={() => navigate("/auth")}>
            Sign Up Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
