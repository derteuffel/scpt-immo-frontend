import { Locale } from "./locale";
import {Occupation} from "./occupation";

export class Contrat{
    id!:any;
    dureeGaranti!:any;
    status!:any;
    montantGaranti!:any;
    numContrat!:any;
    dateSignature!:any;
    nameClient!:any;
    typeClient!:any;
    email!:any;
    contact!:any;
    secteurActivite!:any;
    contratFile!:any;
    billFiles!:any;
    rccm!:any;
    numDossier!:any;
    idNumber!:any;
    occupation!:Occupation;

}
