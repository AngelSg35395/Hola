import React from 'react';
import ChartContainer from './ChartContainer';

const DataVisualization: React.FC = () => {
  // Data for waste collected by type over time
  const wasteByTypeData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'PET',
        data: [65, 78, 82, 75, 92, 88],
        backgroundColor: 'rgba(58, 174, 95, 0.6)',
        borderColor: 'rgb(58, 174, 95)',
        borderWidth: 1,
      },
      {
        label: 'Carton',
        data: [45, 52, 49, 60, 55, 65],
        backgroundColor: 'rgba(39, 163, 210, 0.6)',
        borderColor: 'rgb(39, 163, 210)',
        borderWidth: 1,
      },
      {
        label: 'Latas',
        data: [28, 35, 39, 42, 40, 48],
        backgroundColor: 'rgba(246, 172, 57, 0.6)',
        borderColor: 'rgb(246, 172, 57)',
        borderWidth: 1,
      },
    ],
  };

  // Data for participation rates
  const participationData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tasa de Participación (%)',
        data: [32, 39, 45, 53, 58, 65],
        backgroundColor: 'rgba(39, 163, 210, 0.2)',
        borderColor: 'rgb(39, 163, 210)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Data for campaign impact
  const campaignImpactData = {
    labels: ['Concienciación', 'Ganancia de Conocimiento', 'Cambio de Comportamiento', 'Hábitos a Largo Plazo'],
    datasets: [
      {
        label: 'Pre-Campaña',
        data: [25, 20, 15, 10],
        backgroundColor: 'rgba(156, 163, 175, 0.6)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 1,
      },
      {
        label: 'Post-Campaña',
        data: [65, 55, 45, 40],
        backgroundColor: 'rgba(58, 174, 95, 0.6)',
        borderColor: 'rgb(58, 174, 95)',
        borderWidth: 1,
      },
    ],
  };

  // Data for misclassification rate
  const misclassificationData = {
    labels: ['PET', 'Carton', 'Latas', 'Vidrio', 'Otro'],
    datasets: [
      {
        label: 'Tasa de Clasificación Incorrecta (%)',
        data: [12, 8, 15, 7, 22],
        backgroundColor: [
          'rgba(58, 174, 95, 0.6)',
          'rgba(39, 163, 210, 0.6)',
          'rgba(246, 172, 57, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(107, 114, 128, 0.6)',
        ],
        borderColor: [
          'rgb(58, 174, 95)',
          'rgb(39, 163, 210)',
          'rgb(246, 172, 57)',
          'rgb(239, 68, 68)',
          'rgb(107, 114, 128)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for daily costs
  const costData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Costos Operativos Diarios ($)',
        data: [320, 295, 310, 285, 275, 260],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Visualización de Datos</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Rastrea nuestro progreso con visualizaciones de datos en tiempo real. Cambia entre diferentes tipos de gráficos 
            para analizar la recolección de residuos, tasas de participación y métricas de impacto ambiental.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ChartContainer
            title="Residuos Recolectados por Tipo"
            description="Totales mensuales en kilogramos"
            data={wasteByTypeData}
            options={chartOptions}
            availableTypes={['bar', 'line']}
          />
          
          <ChartContainer
            title="Participación de la Comunidad"
            description="Porcentaje de miembros de la comunidad participando"
            data={participationData}
            options={chartOptions}
            defaultType="line"
            availableTypes={['bar', 'line']}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ChartContainer
            title="Impacto de la Campaña"
            description="Comparando métricas pre y post-campaña"
            data={campaignImpactData}
            options={chartOptions}
            availableTypes={['bar', 'line']}
          />
          
          <ChartContainer
            title="Tasa de Clasificación Incorrecta"
            description="Porcentaje de elementos clasificados incorrectamente por tipo"
            data={misclassificationData}
            options={chartOptions}
            defaultType="pie"
            availableTypes={['bar', 'pie']}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartContainer
            title="Costos Operativos Diarios"
            description="Costos promedio diarios en USD"
            data={costData}
            options={chartOptions}
            defaultType="line"
            availableTypes={['bar', 'line']}
          />
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Necesitas un análisis más detallado?</h3>
            <p className="text-gray-600 text-center mb-6">
              Accede a nuestro conjunto de datos completo para análisis y reportes personalizados.
            </p>
            <button className="bg-primary-500 text-white px-5 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-sm">
              Descargar Datos Completos (CSV)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;