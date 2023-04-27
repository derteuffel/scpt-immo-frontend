import {Contrat} from "./contrat";

export class Facture{
    id!:number;

    montant!:number;
    mois!:string;
    annee!:string;
    motif!:string;
    contrat!:Contrat;

    status!:boolean;

    numFacture!: string;
}
