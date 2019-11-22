import axios from 'axios';

export default () => {
  return axios.get('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json');
};
