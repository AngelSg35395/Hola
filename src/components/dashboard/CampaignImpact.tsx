import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function CampaignImpact() {
  const campaigns = [
    {
      name: 'Recicla Más',
      target: 1000,
      current: 750,
      impact: 'Reducción de residuos en 25%',
    },
    {
      name: 'Composta en Casa',
      target: 500,
      current: 300,
      impact: 'Aumento de compostaje en 40%',
    },
    {
      name: 'Menos Plástico',
      target: 800,
      current: 600,
      impact: 'Reducción de plástico en 30%',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Impacto de Campañas</h2>
      
      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.name}>
            <CardHeader>
              <CardTitle>{campaign.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span>{Math.round((campaign.current / campaign.target) * 100)}%</span>
                </div>
                <Progress value={(campaign.current / campaign.target) * 100} />
                <div className="flex justify-between text-sm">
                  <span>Meta: {campaign.target} kg</span>
                  <span>Actual: {campaign.current} kg</span>
                </div>
                <p className="text-sm text-muted-foreground">{campaign.impact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 