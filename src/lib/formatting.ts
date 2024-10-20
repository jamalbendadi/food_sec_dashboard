
export const formatPercentage = (value: number | null) => {
    if (!value) {
      return '';
    }
    return `${(value * 100).toFixed(2)}%`;
  };

export const formatPeople = (value: number | null) => {
    if (!value) {
      return '';
    }
    return value.toLocaleString();
  };