type TypeItem = {
  name: string;
  type: 'bridge' | 'station';
  latitude: number;
  longitude: number;
  dateOuverture?: string;
  commune?: string;
  isOperational?: boolean;
};

export default TypeItem;
