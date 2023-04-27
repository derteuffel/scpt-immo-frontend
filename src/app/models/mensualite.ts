import {User} from "./user";
import {Facture} from "./facture";

export class Mensualite{
   id: number;


   dateVersement :Date;

   numeroBodereau : string;

   mois : string;
   year: string;

   montant : number;
   reste : number;

   codeMensualite:string;

   status: boolean;

   taux:string;

   dateActivation :Date;


   mensualiteFile:string;

   facture:Facture;

   account:User;
}
