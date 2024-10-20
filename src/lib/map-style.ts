import { FillLayerSpecification } from "mapbox-gl";
const colors = [
  1, '#1f77b4', // Blue
  2, '#ff7f0e', // Orange
  3, '#2ca02c', // Green
  4, '#d62728', // Red
  5, '#9467bd', // Purple
  6, '#8c564b', // Brown
  7, '#e377c2', // Pink
  8, '#7f7f7f', // Gray
  9, '#bcbd22', // Olive
  10, '#17becf', // Teal
  11, '#aec7e8', // Light Blue
  12, '#ffbb78', // Light Orange
  13, '#98df8a', // Light Green
  14, '#ff9896', // Light Red
  15, '#c5b0d5', // Lavender
  16, '#c49c94'  // Taupe
];


export const dataLayer: FillLayerSpecification = {
  id: 'data',
  type: 'fill',
  source: '',
  paint: {
    'fill-color': [
      'match',
      ['%', ['coalesce', ['to-number',['get','mapcolor7']], 0], colors.length],
      ...colors,
      '#ffffff'
    ],
    'fill-opacity': 0.5
  },
};
