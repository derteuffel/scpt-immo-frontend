import {Contrat} from './contrat';

export class Client{
  id: number;
  name: string;
  type: string;
  email: string;
  contact: string;
  activite: string;
  contrats: Contrat[];

}
