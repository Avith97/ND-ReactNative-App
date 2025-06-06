export const TemplateService = {
  _userId: (url, user_id) => {
    return url.replace('user_id', user_id)?.replace('/event_id', '')
  },

  _eventID: (url, event_id) => {
    return url.replace('event_id', event_id)?.replace('user_id/', '')
  },

  _userIDAndEventID: (url, user_id, event_id) => {
    return url.replace('user_id', user_id).replace('event_id', event_id)
  }
}
