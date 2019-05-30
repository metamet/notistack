/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { Component } from 'react'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import { updateSnackbar, removeSnackbar } from './redux/actionCreator'

class Notifier extends Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.notifications !== nextProps.notifications)
  }

  componentDidUpdate() {
    const { notifications } = this.props
    
    Object.keys(notifications).forEach((notification) => {
      const { key, message, options, dismissed } = notifications[notification]

      if (key && !dismissed) {
        return
      }

      // If key is null, the message is new and hasn't been enqueued
      if (!key) {
        let newKey = this.props.enqueueSnackbar(message, options)
        return this.props.updateSnackbar(notification, newKey)
      }

      // If dismissed is set to true, the notification was manually triggered to be removed
      if (dismissed) {
        return this.props.closeSnackbar(key)
        /**
         * Ideally we'd run removeSnackbar... but it appears that notistack queues up non-displayed 
         * notifications in the stack to trickle in after closeSnackbar() is called, and removing them from the store
         * means we cannot loop through them and trigger the dismissal again. So this will remian for now,
         * even though it means the store will grow forever and ever. Oh well. 
         */

        // return this.props.removeSnackbar(notification)
      }
    })
  }

  render() {
    return null
  }
}

const mapStateToProps = store => ({
  notifications: store.app.notifications || {},
})

const mapDispatchToProps = {
  updateSnackbar,
  removeSnackbar,
}

export default withSnackbar(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifier))
