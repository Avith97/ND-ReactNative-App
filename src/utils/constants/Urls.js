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
  register_event: 'register',

  //Get leaderBoard Details
  leaderBoardDetails:
    'public/leaderboard/2477?activity=STEPS&categoryId=4424&activityPriority=PRIMARY&limit=10',

  // profile
  get_profile: 'user/profile/user_id',
  update_profile: 'user/user_id',

  // dashboard
  dashboard_detail: 'android/dashboard/user_id',

  get_individual_url: 'public/leaderboard/event_id',
  get_teams_url: 'public/team/leaderboard/event_id',
  get_single_team: 'public/leaderboard/teamDetails',
  get_age_wise_data: 'public/runner/groupAndTeam/searchStrings/event_id',

  // inidivdual data
  get_all_runners: 'search/event_id',
  get_runner_detail: 'public/activity/event_id/user_id',

  // get single event
  get_event: 'event/event_id',

  runner_group: 'public/runner/groupDetails/leaderboard/event_id',
  get_runner_group: 'public/groupRunner/leaderboard/event_id',

  save_health_data: 'save/health/connect/user/activity'
}
