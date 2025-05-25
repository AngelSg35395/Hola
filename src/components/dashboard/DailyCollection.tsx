import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DailyCollection() {
  const collections = [
    {
      date: '2024-03-20',
      organic: 150,
      recyclable: 200,
      nonRecyclable: 100,
      total: 450,
    },
    {
      date: '2024-03-19',
      organic: 140,
      recyclable: 180,
      nonRecyclable: 90,
      total: 410,
    },
    {
      date: '2024-03-18',
      organic: 160,
      recyclable: 220,
      nonRecyclable: 110,
      total: 490,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Recolección Diaria</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Registro de Recolección</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Orgánico (kg)</TableHead>
                <TableHead className="text-right">Reciclable (kg)</TableHead>
                <TableHead className="text-right">No Reciclable (kg)</TableHead>
                <TableHead className="text-right">Total (kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((collection) => (
                <TableRow key={collection.date}>
                  <TableCell>{collection.date}</TableCell>
                  <TableCell className="text-right">{collection.organic}</TableCell>
                  <TableCell className="text-right">{collection.recyclable}</TableCell>
                  <TableCell className="text-right">{collection.nonRecyclable}</TableCell>
                  <TableCell className="text-right font-medium">{collection.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 