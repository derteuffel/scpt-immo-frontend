import {Representation} from './representation';
import {Contrat} from './contrat';

export class Locale {
id: number;
numLocale: number;
montant: number;
superficie: number;
status: boolean;
representation: Representation;
contrats: Contrat[];
}
