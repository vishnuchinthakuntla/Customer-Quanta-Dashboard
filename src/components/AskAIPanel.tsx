import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Sparkles, Send } from 'lucide-react';

const suggestions = [
  "Which variant wins at p<0.05?",
  "What's driving DAU drop in v3.4?",
  "Show rage-click hotspots",
  "Compare cohort retention curves",
  "Explain LCP regression on Android",
];

export function AskAIPanel() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = (q: string) => {
    setQuestion(q);
    // Simulate AI response
    setTimeout(() => {
      setAnswer(`Analysis shows that ${q.toLowerCase()} Based on the current data, the "New Onboarding Flow" variant B achieves statistical significance (p=0.003) with an 11.2% uplift in Feature Adoption while maintaining positive guardrail metrics (+0.8% DAU). The uplift is primarily driven by reduced friction in step 2 of the onboarding process.`);
    }, 800);
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-slate-900">Ask AI</h3>
        <Badge variant="secondary" className="text-xs">Beta</Badge>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-3">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, i) => (
            <Badge 
              key={i}
              variant="outline" 
              className="cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => handleAsk(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <Textarea 
            placeholder="Ask a question about your product metrics..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="resize-none"
            rows={2}
          />
          <Button 
            size="icon"
            onClick={() => handleAsk(question)}
            disabled={!question.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {answer && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">{answer}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
