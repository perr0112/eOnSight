type TypeItem = {
  name: string;
  type: 'bridge' | 'station';
  latitude: number;
  longitude: number;
  dateOuverture?: string;
  commune?: string;
};

export default TypeItem;
