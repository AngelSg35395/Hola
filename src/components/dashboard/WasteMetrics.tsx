import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WasteMetrics() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Métricas de Residuos</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Residuos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350 kg</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reciclaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 kg</div>
            <p className="text-xs text-muted-foreground">
              +15.3% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compostaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450 kg</div>
            <p className="text-xs text-muted-foreground">
              +8.2% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Residuos No Reciclables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">650 kg</div>
            <p className="text-xs text-muted-foreground">
              -5.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 