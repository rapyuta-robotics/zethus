import _ from 'lodash';
import { compositionList } from './apiResponses';

export const getCompositionDetailsApi = compositionId => new Promise((resolve) => {
  resolve(_.find(compositionList, c => c.key === compositionId).details);
});
