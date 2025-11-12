import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Edit, FileDown, MapPin, Share2, Sun } from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
import type { TripData } from "@/pages/Plan";

interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  cost: number;
  weather: { icon: string; temp: string; condition: string };
  transport: string;
  travelTime: string;
}

interface DayPlan {
  date: Date;
  dayNumber: number;
  activities: Activity[];
  totalCost: number;
}

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);

  useEffect(() => {
    const savedTrip = localStorage.getItem("currentTrip");
    if (!savedTrip) {
      navigate("/plan");
      return;
    }

    const trip: TripData = JSON.parse(savedTrip);
    setTripData(trip);

    // Generate mock itinerary
    const days = differenceInDays(new Date(trip.toDate), new Date(trip.fromDate)) + 1;
    const mockItinerary: DayPlan[] = [];

    for (let i = 0; i < days; i++) {
      const date = addDays(new Date(trip.fromDate), i);
      const activities: Activity[] = [
        {
          time: "09:00-11:00",
          title: "Morning Museum Visit",
          description: "Explore the city's rich cultural heritage",
          location: "Central Museum",
          cost: 25,
          weather: { icon: "☀️", temp: "72°F", condition: "Sunny" },
          transport: "Walk",
          travelTime: "15 min",
        },
        {
          time: "11:30-13:00",
          title: "Local Market Tour",
          description: "Browse local crafts and sample street food",
          location: "Market Square",
          cost: 30,
          weather: { icon: "☀️", temp: "75°F", condition: "Clear" },
          transport: "Public Transport",
          travelTime: "10 min",
        },
        {
          time: "14:00-16:30",
          title: "Landmark Sightseeing",
          description: "Visit iconic landmarks and photo spots",
          location: "Historic District",
          cost: 20,
          weather: { icon: "⛅", temp: "78°F", condition: "Partly Cloudy" },
          transport: "Walk",
          travelTime: "20 min",
        },
        {
          time: "19:00-21:00",
          title: "Dinner & Entertainment",
          description: "Traditional cuisine and live music",
          location: "Riverside Restaurant",
          cost: 60,
          weather: { icon: "🌙", temp: "68°F", condition: "Clear Night" },
          transport: "Taxi",
          travelTime: "15 min",
        },
      ];

      mockItinerary.push({
        date,
        dayNumber: i + 1,
        activities,
        totalCost: activities.reduce((sum, a) => sum + a.cost, 0),
      });
    }

    setItinerary(mockItinerary);
  }, [navigate]);

  if (!tripData) return null;

  const totalBudget = tripData.budgetPerPerson
    ? tripData.budget * tripData.numPeople
    : tripData.budget;
  const usedBudget = itinerary.reduce((sum, day) => sum + day.totalCost, 0);

  const handleEdit = () => {
    navigate("/plan");
  };

  const handleExport = () => {
    toast({ title: "Export PDF", description: "PDF export feature coming soon!" });
  };

  const handleShare = () => {
    toast({ title: "Share", description: "Link copied to clipboard!" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-6xl py-8 px-4">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{tripData.destination}</CardTitle>
                <CardDescription className="text-lg">
                  {format(new Date(tripData.fromDate), "MMM d")} -{" "}
                  {format(new Date(tripData.toDate), "MMM d, yyyy")} • {itinerary.length} days •{" "}
                  {tripData.numPeople} {tripData.numPeople === 1 ? "person" : "people"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleEdit} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={handleExport} variant="outline" size="sm">
                  <FileDown className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">${totalBudget}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Used</p>
                <p className="text-2xl font-bold text-accent">${usedBudget}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-success">${totalBudget - usedBudget}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Weather</p>
                <p className="text-2xl">☀️ 74°F</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day-by-Day Itinerary */}
        <div className="space-y-6">
          {itinerary.map((day) => (
            <Card key={day.dayNumber}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Day {day.dayNumber}</CardTitle>
                    <CardDescription>{format(day.date, "EEEE, MMMM d, yyyy")}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg">
                    ${day.totalCost}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.activities.map((activity, idx) => (
                  <div key={idx}>
                    {idx > 0 && <Separator className="my-4" />}
                    <div className="grid md:grid-cols-12 gap-4">
                      <div className="md:col-span-2">
                        <Badge variant="secondary" className="font-mono">
                          {activity.time}
                        </Badge>
                      </div>
                      <div className="md:col-span-7 space-y-2">
                        <h4 className="font-semibold text-lg">{activity.title}</h4>
                        <p className="text-muted-foreground">{activity.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-accent" />
                            {activity.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Sun className="h-4 w-4 text-accent" />
                            {activity.weather.icon} {activity.weather.temp}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{activity.transport}</Badge>
                          <Badge variant="outline">{activity.travelTime}</Badge>
                        </div>
                      </div>
                      <div className="md:col-span-3 flex flex-col items-end gap-2">
                        <p className="text-2xl font-bold">${activity.cost}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                          <Button size="sm" variant="outline">
                            ✓
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
