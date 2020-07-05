// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


var env = "pro";
var url_site = '';

if(env === 'pro'){
  url_site = 'http://digital.ciamsa.com/api/v1/';
}else if(env === 'dev'){
  url_site = 'http://test.ciamsa.com/api/v1/';
}

export const environment = {
  production: true,
  ciamsaToken2: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM0Y2ZlOTc3MjMxYjI0OGJmNTQ2OGM3MzQyNjIxMmFlNDg1MmVlODZmOTM0YjA1M2UzMTNjMTVkYTRkOGU0MGMyNjkzMjZhMTUyN2FlY2ZiIn0.eyJhdWQiOiIxIiwianRpIjoiMzRjZmU5NzcyMzFiMjQ4YmY1NDY4YzczNDI2MjEyYWU0ODUyZWU4NmY5MzRiMDUzZTMxM2MxNWRhNGQ4ZTQwYzI2OTMyNmExNTI3YWVjZmIiLCJpYXQiOjE1NTg0NTY1OTAsIm5iZiI6MTU1ODQ1NjU5MCwiZXhwIjoxNTkwMDc4OTkwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.iR9HwS74ri5KcfGA9-oX9Qmnbxg40RbhUOF8q1v8SMv0_FLfijfZPdESfTYC7yH9zaeTVlmaAZxY4ndkIWtMAJkqe4g-eyxkyspfGgFaD72weyv667qspFJeMUzQk_Pk2xYQbxP0d4qGml7T8Ja28Ku9F8Pq08hgW5HnMIIOMo3mMpvS8D_pKdchxi8cuht_2RLMiAngjpWPo0uCMGTdTsyB2cyMn0dEDkizvSNJOqfMky3WSDo4ShoJBGRNfOaiDppoWFQj3aJ2CAsFQAz4OfebzXQfDMPxIgEJfKwzKiaOZ_HysLCeeyD5lB03kiDvM427BFnqBmyOT_5QOCFXPLwjifwIEIpqRPz7TZsX9luXUufWvm5hgRELxljI-3tgh66hP_PtcSjLEggGuBuff_LZF33fW9YHmk3rw93x2fXTzFayFVaeVzvG0AdqdoPRuu3A_Z_vszHLHSoR_5kypmKYZ9EoqWZ8Ua7VweUn-TBu4X8GZ9lcL2HZHXT6hY3tl2Z8Me-OR4ZowuYEnSPPaRoMlIbK7oNZWNkaOhYa8sB77lbAdQIAhoC5Up6x1Tp2k-MM2kiy9VsmeWDdDudj2-kWkAzlgMP_nf8R7ImqIyt6Js0qCe5rrrL_u00Gk_ONeesAsEJmKe_u106riJcowjK_lAKP88YjJSLQ7AJuKXw',
  url_site: url_site
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
