import {environment} from '../../../settings';

const SERVER = {
  LIVE: 'https://events.necessarydevil.com/api/v1/',
  DEV: 'https://192.168.1.49:8443/api/v1/',
  UAT: 'UAT',
  PRE_PROD: 'PRE_PROD',
};

export const BASE_URL = SERVER[environment];

export const URL = {
  google: 'www.google.in',
  otp: 'login/otp',
  otp_verify: 'login/verify/otp', //{userName: "vinit@anssoft.in", otp: "122222", distKey: "TXK8vWYRPSXm08uXrZYV0g=="}//{code: "401", verbose: "Invalid OTP"}}
  create_profile: 'signup',

  //Get All Event list
  events: '3668/events',
  upcomingEvents: 'upcomingEvents/3668',

  //delete user
  delete_user: 'delete/user',
};
