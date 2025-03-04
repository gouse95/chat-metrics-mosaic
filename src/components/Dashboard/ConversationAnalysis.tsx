
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { formatDate, formatTime, abbreviateId } from '@/utils/formatters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConversationDetailsResult } from '@/services/api';

interface ConversationAnalysisProps {
  data: ConversationDetailsResult;
  isLoading?: boolean;
}

export function ConversationAnalysis({ 
  data,
  isLoading = false 
}: ConversationAnalysisProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Flatten conversation data for table display
  const conversations = Object.values(data).flatMap(convs => convs[0]);
  
  const filteredConversations = conversations.filter(conv => 
    conv.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.guardrails_reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.app_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.conv_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Conversation Analysis
            </CardTitle>
            <CardDescription>
              Recent conversations and their details
            </CardDescription>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[200px]"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSearchTerm('gpt-4')}>
                  GPT-4 Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm('gpt-3.5')}>
                  GPT-3.5 Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm('policy')}>
                  Policy Violations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm('')}>
                  Clear Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 w-full shimmer rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-auto max-h-[500px]">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0">
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Conversation ID</TableHead>
                  <TableHead>App ID</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Execution Time</TableHead>
                  <TableHead>Guardrail</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConversations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No conversations found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredConversations.slice(0, 10).map((conv) => (
                    <TableRow key={conv.id} className="group hover:bg-muted/30">
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            conv.model_name === 'gpt-4' 
                              ? 'bg-purple-100 text-purple-800 border-purple-200' 
                              : conv.model_name === 'gpt-3.5'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : 'bg-green-100 text-green-800 border-green-200'
                          }
                        >
                          {conv.model_name}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {abbreviateId(conv.conv_id)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {abbreviateId(conv.app_id)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs">{formatDate(conv.created_at)}</span>
                          <span className="text-xs text-muted-foreground">{formatTime(conv.created_at)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{conv.execution_time.toFixed(2)}s</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="truncate max-w-[150px] inline-block">
                          {conv.guardrails_reason}
                        </span>
                      </TableCell>
                      <TableCell>
                        {conv.guardrails_status === 'yes' ? (
                          <div className="flex items-center text-rose-500">
                            <XCircle className="h-4 w-4 mr-1" />
                            <span>Triggered</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-emerald-500">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span>Passed</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
