import {
  SET_SNACKBAR,
  UPDATE_SNACKBAR,
  DISMISS_SNACKBAR,
  DISMISS_ALL_SNACKBARS,
  REMOVE_SNACKBAR,
} from './actionType'

const defaultState = {
  notifications: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_SNACKBAR: {
      const { id, notification } = action.payload
      let newState = {
        ...state,
        notifications: {
          ...state.notifications,
          [id]: {
            ...notification,
            key: null,
            dismissed: false
          }
        },
      }
      return newState
    }
    case UPDATE_SNACKBAR: {
      const { id, key } = action.payload
      let newState = {
        ...state,
        notifications: {
          ...state.notifications,
          [id]: {
            ...state.notifications[id],
            key: key
          }
        }
      }
      return newState
    }
    case DISMISS_SNACKBAR: {
      const { id } = action.payload
      let newState = {
        ...state,
        notifications: {
          ...state.notifications,
          [id]: {
            ...state.notifications[id],
            dismissed: true
          }
        }
      }
      return newState
    }
    case DISMISS_ALL_SNACKBARS: {
      let newState = {
        ...state,
        notifications: Object.keys(state.notifications).reduce((result, v) => {
          result[v] = {
            ...state.notifications[v],
            dismissed: true
          }
          return result
        }, {}),
      }
      return newState
    }
    case REMOVE_SNACKBAR: {
      const { id } = action.payload
      let newState = {
        ...state,
        notifications: Object.keys(state.notifications).reduce((result, v) => {
          if (v !== id) {
            result[v] = state.notifications[v]
          }
          return result
        }, {}),
      }
      return newState
    }
    default:
      return state
  }
}
