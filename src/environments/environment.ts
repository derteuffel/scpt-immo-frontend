// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const HOST = 'http://localhost:8181/api'
//export const HOST = 'http://41.79.235.88:8282/api'
export const environment = {
  production: false,

  AUTH : `${HOST}/auth`,
  REPRESENTATION: `${HOST}/representation`,
  LOCALE: `${HOST}/locale`,
  CONTRAT: `${HOST}/contrat`,
  MENSUALITE: `${HOST}/mensualite`,
  DOSSIER: `${HOST}/dossier`,
  ETAPE: `${HOST}/etape`,
  BORDEREAUX: `${HOST}/facture`,
  STATISTIQUE: `${HOST}/reporting`,
  OCCUPATION: `${HOST}/occupation`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
