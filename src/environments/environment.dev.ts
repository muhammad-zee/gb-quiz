let year = new Date().getFullYear();
export const environment = {
  production: true,
  brandName: 'Golden Bridge CRM',
  brandLogo: 'assets/logo.svg',
  website: 'https://listing.crm-gb.com',
  apiUrl: 'http://localhost:8000/api/',
  baseUrl: 'http://localhost:8000/',
  wsUrl: 'wss://7ff2-217-165-112-58.ngrok-free.app:8090',
  appUrl: 'crm-gb.com',
  aboutText: '',
  copyrightText: '<small>&copy; Copyright ' + year + ' <strong>Golden Bridge CRM</strong>. All Rights Reserved.</small>',
  defaultCountry: {
    id: 220,
    name: 'UAE',
    code2: 'AE',
    code3: 'ARE',
    phoneCode: '+971'
  },
  defaultCity: {
    id: 4,
    name: 'Dubai',
    code: 'DXB'
  },
  defaultLang: {
    id: 40,
    name: 'English',
    native_name: 'English',
    iso_code: 'en'
  },
  google: {
    apiKey: 'AIzaSyCcdT53WLAQRFq3L1rQQlVKUVAFtG_UR-8'
  },
  facebook: {
    apiUrl: 'http://graph.facebook.com/v3.2/',
    app: {
      id: '',
      name: 'Properties',
      clientToken: '',
      token: '|cyHt_jENvWc-3Snzvch-TtoULw0'
    },
    adAccount: {
      id: '111252679302794',
      name: 'Salesnook'
    },
    business: {
      id: '',
      name: 'Properties',
      username: 'apiuser',
      token:''
    }
  },
  oneSignal: {
    appId: '',
    safariWebId: '',
    domain: ''
  },
  docuSign: {
    userId: '9bf9d159-9a4d-4d2b-89c3-2d602191ca2c',
    clientId: '08e70213-2521-4e31-96df-0a88d08006f9',
    accountId: '7c3f5a6a-e2bb-4219-aff9-7c0491397f47',
    clientSecretKey: 'e997f8a2-0fa8-4113-8aaf-c71e258995ff',
    baseURL: 'https://account-d.docusign.com',
    callbackURL: 'http://localhost:4200'
  },
  docuSign_Live: {
    userId: '48ee479e-d193-42d0-a4c1-de1329f7b19d',
    clientId: '08e70213-2521-4e31-96df-0a88d08006f9',
    accountId: 'e2498871-a2f1-448a-8b52-8f9c982c2448',
    clientSecretKey: 'dc38390e-4755-440d-9280-547e1b5098e7',
    baseURL: 'https://account.docusign.com',
    callbackURL: 'http://localhost:4200'
  }
};
