import {Dossier} from "./dossier";

export class Etape{

   id!:number;

   status!:boolean;
   observation!:string;
   fichier!:string;
   action!:string;
   service!:string;
   type!:string;
   state!:string;

   dossier!:Dossier;
}
