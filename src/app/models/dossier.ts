import {Occupation} from "./occupation";

export class Dossier{
    id!:number;

   nomDemandeur!:string;
   telephone!:string;
   email!:string;
   activite!:string;
  raisonSocial!: string;

  files!:string[];
  dateCreation!:any;

   code!:string;
   status!:string;
   occupation!: Occupation;
}
