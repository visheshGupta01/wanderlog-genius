import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { TripData } from "@/pages/Plan";

const transportModes = ["Walk", "Public Transport", "Car", "Bike", "Train", "Flight"];
const activityTypes = [
  "Sightseeing",
  "Hiking",
  "Museums",
  "Food",
  "Nightlife",
  "Shopping",
  "Beaches",
  "Adventure",
];
const accommodationTypes = [
  "Hostel",
  "Budget Hotel",
  "Mid-range Hotel",
  "Luxury Hotel",
  "Apartment/Airbnb",
];
const paceOptions = ["Relaxed", "Moderate", "Packed"];

interface TripFormInputsProps {
  tripData: TripData;
  setTripData: (data: TripData) => void;
}

export const TripFormInputs = ({ tripData, setTripData }: TripFormInputsProps) => {
  const toggleTransport = (mode: string) => {
    setTripData({
      ...tripData,
      transport: tripData.transport.includes(mode)
        ? tripData.transport.filter((m) => m !== mode)
        : [...tripData.transport, mode],
    });
  };

  const toggleActivity = (activity: string) => {
    setTripData({
      ...tripData,
      activities: tripData.activities.includes(activity)
        ? tripData.activities.filter((a) => a !== activity)
        : [...tripData.activities, activity],
    });
  };

  return (
    <div className="space-y-6">
      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !tripData.fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {tripData.fromDate ? format(tripData.fromDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={tripData.fromDate}
                onSelect={(date) => date && setTripData({ ...tripData, fromDate: date })}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !tripData.toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {tripData.toDate ? format(tripData.toDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={tripData.toDate}
                onSelect={(date) => date && setTripData({ ...tripData, toDate: date })}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Destination */}
      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          placeholder="e.g., Paris, France"
          value={tripData.destination}
          onChange={(e) => setTripData({ ...tripData, destination: e.target.value })}
        />
      </div>

      {/* Number of People and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numPeople">Number of People</Label>
          <Input
            id="numPeople"
            type="number"
            min="1"
            max="20"
            value={tripData.numPeople}
            onChange={(e) =>
              setTripData({ ...tripData, numPeople: parseInt(e.target.value) || 1 })
            }
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="budget">Total Budget ($)</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="perPerson"
                checked={tripData.budgetPerPerson}
                onCheckedChange={(checked) =>
                  setTripData({ ...tripData, budgetPerPerson: checked as boolean })
                }
              />
              <Label htmlFor="perPerson" className="text-sm font-normal cursor-pointer">
                Per person
              </Label>
            </div>
          </div>
          <Input
            id="budget"
            type="number"
            min="0"
            value={tripData.budget}
            onChange={(e) =>
              setTripData({ ...tripData, budget: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      {/* Transport Modes */}
      <div className="space-y-2">
        <Label>Preferred Transport</Label>
        <div className="flex flex-wrap gap-2">
          {transportModes.map((mode) => (
            <Badge
              key={mode}
              variant={tripData.transport.includes(mode) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTransport(mode)}
            >
              {mode}
            </Badge>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-2">
        <Label>Preferred Activities</Label>
        <div className="flex flex-wrap gap-2">
          {activityTypes.map((activity) => (
            <Badge
              key={activity}
              variant={tripData.activities.includes(activity) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleActivity(activity)}
            >
              {activity}
            </Badge>
          ))}
        </div>
      </div>

      {/* Accommodation */}
      <div className="space-y-2">
        <Label>Accommodation Type</Label>
        <RadioGroup
          value={tripData.accommodation}
          onValueChange={(value) => setTripData({ ...tripData, accommodation: value })}
        >
          {accommodationTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <RadioGroupItem value={type} id={type} />
              <Label htmlFor={type} className="font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Pace */}
      <div className="space-y-2">
        <Label>Travel Pace</Label>
        <RadioGroup
          value={tripData.pace}
          onValueChange={(value) => setTripData({ ...tripData, pace: value })}
          className="flex gap-4"
        >
          {paceOptions.map((pace) => (
            <div key={pace} className="flex items-center space-x-2">
              <RadioGroupItem value={pace} id={pace} />
              <Label htmlFor={pace} className="font-normal cursor-pointer">
                {pace}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Extra Options */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeEvents"
            checked={tripData.includeEvents}
            onCheckedChange={(checked) =>
              setTripData({ ...tripData, includeEvents: checked as boolean })
            }
          />
          <Label htmlFor="includeEvents" className="font-normal cursor-pointer">
            Include local events
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="kidFriendly"
            checked={tripData.kidFriendly}
            onCheckedChange={(checked) =>
              setTripData({ ...tripData, kidFriendly: checked as boolean })
            }
          />
          <Label htmlFor="kidFriendly" className="font-normal cursor-pointer">
            Kid-friendly activities
          </Label>
        </div>
      </div>
    </div>
  );
};
