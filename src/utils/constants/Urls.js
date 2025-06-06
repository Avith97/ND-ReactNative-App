import { environment } from '../../../settings'

const SERVER = {
  LIVE: 'https://events.necessarydevil.com/api/v1/',
  DEV: 'https://192.168.1.49:8443/api/v1/',
  UAT: 'UAT',
  PRE_PROD: 'PRE_PROD'
}

export const BASE_URL = SERVER[environment]

export const URL = {
  google: 'www.google.in',
  otp: 'login/otp',
  otp_verify: 'login/verify/otp',
  create_profile: 'signup',

  //delete user
  delete_user: 'delete/user',
  //Get All Event list
  // my_events: "events",
  my_events: 'user_id/events',
  upcoming_events: 'upcomingEvents/user_id',
  check_user_registered: 'event/registered/${event_id}/${user_id}',

  get_event: 'event/event_id',
  register_event: 'register'
}
