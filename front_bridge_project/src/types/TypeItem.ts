type TypeItem = {
  name: string;
  type: 'bridge' | 'station';
  latitude: number;
  longitude: number;
  dateOuverture?: string;
  commune?: string;
  isOperational?: boolean;
  codeStation?: string;
};

export default TypeItem;
