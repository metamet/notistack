import {
  SET_SNACKBAR,
  UPDATE_SNACKBAR,
  REMOVE_SNACKBAR,
  DISMISS_SNACKBAR,
  DISMISS_ALL_SNACKBARS,
} from './actionType'

// Calling this action setSnackbar because enqueueSnackbar is already in use by notistack
export const setSnackbar = (notification, id = new Date().getTime() + Math.random()) => ({
  type: SET_SNACKBAR,
  payload: {
    id,
    notification: {
      ...notification,
    },
  }
})

export const updateSnackbar = (id, key) => ({
  type: UPDATE_SNACKBAR,
  payload: {
    id, 
    key,
  }
})

export const dismissSnackbar = id => ({
  type: DISMISS_SNACKBAR,
  payload: {
    id,
  }
})

export const dismissAllSnackbars = () => ({
  type: DISMISS_ALL_SNACKBARS,
})

export const removeSnackbar = id => ({
  type: REMOVE_SNACKBAR,
  payload: {
    id,
  }
})
