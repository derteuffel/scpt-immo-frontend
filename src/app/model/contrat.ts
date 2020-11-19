import {Locale} from './locale';
import {Client} from './client';

export class Contrat{
  id: number;
  dureeGaranti: number;
  status: boolean;
  montantGaranti: number;
  dateSignature: string;
  client: Client;
  locale: Locale;
}
