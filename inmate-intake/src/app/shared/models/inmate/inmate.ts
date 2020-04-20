import { LocationHistory } from './location-history';
import * as moment from 'moment';

export interface Inmate {
  id: number;
  firstNames: string;
  lastName: string;
  dob: moment.Moment;
  cellNumber: number;
  intakeDate: moment.Moment;
  isActive: boolean;
  locationHistory: LocationHistory[];
}
