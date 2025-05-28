import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ObjectiveCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'primary' | 'secondary' | 'accent';
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-500',
      light: 'bg-primary-50',
      text: 'text-primary-500',
      border: 'border-primary-200',
    },
    secondary: {
      bg: 'bg-secondary-500',
      light: 'bg-secondary-50',
      text: 'text-secondary-500',
      border: 'border-secondary-200',
    },
    accent: {
      bg: 'bg-accent-500',
      light: 'bg-accent-50',
      text: 'text-accent-500',
      border: 'border-accent-200',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className={`relative overflow-hidden rounded-lg border ${classes.border} bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          
          {trend && (
            <div className={`mt-2 inline-flex items-center text-sm ${trend.isPositive ? 'text-success-500' : 'text-error-500'}`}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="ml-1 text-gray-500">vs. last month</span>
            </div>
          )}
        </div>
        
        <div className={`${classes.light} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${classes.text}`} />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className={`absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-10 ${classes.bg}`}></div>
    </div>
  );
};

export default ObjectiveCard;