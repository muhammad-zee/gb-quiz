let year = new Date().getFullYear();
export const environment = {
  production: true,
  brandName: 'Golden Bridge CRM',
  brandLogo: 'assets/logo.svg',
  website: 'https://listing.crm-gb.com',
  apiUrl: 'https://api.crm-gb.com/api/',
  baseUrl: 'https://api.crm-gb.com',
  wsUrl: 'wss://api.crm-gb.com:8090',
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
    userId: '48ee479e-d193-42d0-a4c1-de1329f7b19d',
    clientId: '08e70213-2521-4e31-96df-0a88d08006f9',
    accountId: 'e2498871-a2f1-448a-8b52-8f9c982c2448',
    clientSecretKey: 'dc38390e-4755-440d-9280-547e1b5098e7',
    baseURL: 'https://account.docusign.com',
    callbackURL: 'https://crm-gb.com'
  }
};
