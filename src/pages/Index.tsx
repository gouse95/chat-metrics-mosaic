
import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/Dashboard/Header';
import { MetricsCard } from '@/components/Dashboard/MetricsCard';
import { ChartSection } from '@/components/Dashboard/ChartSection';
import { GuardrailsSection } from '@/components/Dashboard/GuardrailsSection';
import { ConversationAnalysis } from '@/components/Dashboard/ConversationAnalysis';
import { TokenUsage } from '@/components/Dashboard/TokenUsage';
import { ModelDistribution } from '@/components/Dashboard/ModelDistribution';
import { DailyActivity } from '@/components/Dashboard/DailyActivity';
import { LoadingState } from '@/components/Dashboard/LoadingState';
import { formatNumber, formatCompactNumber } from '@/utils/formatters';
import { 
  Users, 
  MessageCircle, 
  Layers, 
  Zap,
  Clock,
  Activity,
  AlertTriangle,
  BarChart2
} from 'lucide-react';
import { 
  fetchPlatformMetrics, 
  fetchAdditionalMetrics,
  fetchAdvancedMetrics,
  fetchChatAnalysis,
  fetchConversationDetails,
  type PlatformMetricsResult,
  type AdditionalMetricsResult,
  type AdvancedMetricsResult,
  type ChatAnalysisResult,
  type ConversationDetailsResult,
} from '@/services/api';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetricsResult | null>(null);
  const [additionalMetrics, setAdditionalMetrics] = useState<AdditionalMetricsResult | null>(null);
  const [advancedMetrics, setAdvancedMetrics] = useState<AdvancedMetricsResult | null>(null);
  const [chatAnalysis, setChatAnalysis] = useState<ChatAnalysisResult | null>(null);
  const [conversationDetails, setConversationDetails] = useState<ConversationDetailsResult | null>(null);

  // Transform app usage distribution for chart display
  const appUsageData = additionalMetrics ? Object.entries(additionalMetrics.app_usage_distribution).map(([key, value]) => ({
    appId: key.slice(0, 8) + '...',
    usage: value
  })) : [];

  // Transform model usage for chart display
  const modelUsageData = additionalMetrics ? Object.entries(additionalMetrics.model_usage_distribution).map(([key, value]) => ({
    model: key,
    usage: value
  })) : [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [platform, additional, advanced, analysis, conversations] = await Promise.all([
          fetchPlatformMetrics(),
          fetchAdditionalMetrics(),
          fetchAdvancedMetrics(),
          fetchChatAnalysis(),
          fetchConversationDetails()
        ]);
        
        setPlatformMetrics(platform);
        setAdditionalMetrics(additional);
        setAdvancedMetrics(advanced);
        setChatAnalysis(analysis);
        setConversationDetails(conversations);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !platformMetrics || !additionalMetrics || !advancedMetrics || !chatAnalysis || !conversationDetails) {
    return <LoadingState message="Loading dashboard data..." />;
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-24 max-w-[1600px]">
      <DashboardHeader 
        title="Analytics Dashboard" 
        subtitle="Monitor and analyze your AI platform metrics"
      />
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricsCard
          title="Total Users"
          value={formatNumber(platformMetrics.total_users)}
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendValue={12}
          trendLabel="vs last month"
          isLoading={isLoading}
        />
        <MetricsCard
          title="Active Conversations"
          value={formatNumber(additionalMetrics.total_active_conversations)}
          icon={<MessageCircle className="h-5 w-5" />}
          trend="up"
          trendValue={8}
          trendLabel="vs last month"
          isLoading={isLoading}
        />
        <MetricsCard
          title="Total Messages"
          value={formatNumber(platformMetrics.total_messages)}
          icon={<Layers className="h-5 w-5" />}
          trend="up"
          trendValue={15}
          trendLabel="vs last month"
          isLoading={isLoading}
        />
        <MetricsCard
          title="Total Tokens Used"
          value={formatCompactNumber(chatAnalysis.total_tokens)}
          icon={<Zap className="h-5 w-5" />}
          trend="up"
          trendValue={23}
          trendLabel="vs last month"
          isLoading={isLoading}
        />
      </div>
      
      {/* Second Row - More Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricsCard
          title="Average Execution Time"
          value={`${chatAnalysis.average_execution_time.toFixed(2)}s`}
          icon={<Clock className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <MetricsCard
          title="Messages Per User"
          value={additionalMetrics.average_messages_per_user.toFixed(1)}
          icon={<Activity className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <MetricsCard
          title="Guardrail Events"
          value={formatNumber(chatAnalysis.total_guardrail_events)}
          icon={<AlertTriangle className="h-5 w-5" />}
          trend="down"
          trendValue={5}
          trendLabel="vs last month"
          isLoading={isLoading}
        />
      </div>
      
      {/* Charts - First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartSection
          title="App Usage Distribution"
          description="Number of conversations per application"
          data={appUsageData}
          dataKey="usage"
          nameKey="appId"
          isLoading={isLoading}
        />
        <ModelDistribution
          data={additionalMetrics.model_usage_distribution}
          isLoading={isLoading}
        />
      </div>
      
      {/* Charts - Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TokenUsage
          promptTokens={chatAnalysis.total_prompt_tokens}
          completionTokens={chatAnalysis.total_completion_tokens}
          totalTokens={chatAnalysis.total_tokens}
          ratio={chatAnalysis.prompt_vs_completion_ratio}
          dailyTrend={chatAnalysis.daily_tokens_trend}
          isLoading={isLoading}
        />
        <GuardrailsSection
          title="Guardrail Triggers"
          data={chatAnalysis.guardrail_trigger_distribution}
          totalEvents={chatAnalysis.total_guardrail_events}
          isLoading={isLoading}
        />
      </div>
      
      {/* Daily Activity Chart */}
      <div className="mb-8">
        <DailyActivity
          data={advancedMetrics.daily_message_counts}
          isLoading={isLoading}
        />
      </div>
      
      {/* Conversation Analysis Table */}
      <div>
        <ConversationAnalysis
          data={conversationDetails}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
