import {Locale} from './locale';
import {AccountRepresentation} from './account-representation';

export class Representation {

  id: number;
  province: string;
  ville: string;
  commune: string;
  avenue: string;
  numParcelle: number;
  locales: Locale[];
  accountRepresentation: AccountRepresentation[];

}
