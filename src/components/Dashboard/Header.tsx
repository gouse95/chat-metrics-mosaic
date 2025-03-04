
import { useState } from 'react';
import { Search, Calendar, Bell, Settings, UserMinus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onUserSelect?: (userId: string) => void;
  onModelSelect?: (modelId: string) => void;
  userOptions?: { id: string, name: string }[];
}

export function DashboardHeader({ 
  title, 
  subtitle,
  onUserSelect,
  onModelSelect,
  userOptions = [] 
}: DashboardHeaderProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <header className="mb-8 animate-slideInLeft">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8 rounded-lg bg-background border-muted"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start text-left font-normal border-muted">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Select 
            defaultValue="all" 
            onValueChange={(value) => onModelSelect && onModelSelect(value)}
          >
            <SelectTrigger className="w-[150px] border-muted">
              <SelectValue placeholder="Filter by model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
              <SelectItem value="lamma">Llama</SelectItem>
              <SelectItem value="mixtral">Mixtral</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            defaultValue="all" 
            onValueChange={(value) => onUserSelect && onUserSelect(value)}
          >
            <SelectTrigger className="w-[180px] border-muted">
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {userOptions.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name || user.id.slice(0, 8)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button size="icon" variant="ghost" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button size="icon" variant="ghost" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
