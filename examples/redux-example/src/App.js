import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Notifier from './Notifier'
import { 
  setSnackbar, 
  dismissSnackbar,
  dismissAllSnackbars
} from './redux/actionCreator'
import SnackMessage from './SnackMessage'

const App = (props) => {
  const handlePersistClick = () => {
    let notificationId = new Date().getTime() + Math.random()
    props.setSnackbar({
      message: 'PERSIST: test.',
      options: {
        variant: 'info',
        persist: true
      },
    }, notificationId)
    setTimeout(function() {
      // Two seconds later, lets nix it by manually triggering dismissal
      props.dismissSnackbar(notificationId)
    }, 500)
  }

  const handlePersistManualClick = () => {
    let notificationId = new Date().getTime() + Math.random()
    let message = 'PERSIST: Dismiss me?'
    props.setSnackbar({
      message,
      options: {
        variant: 'info',
        children: (key) => (
          <SnackMessage handleDismiss={() => props.dismissSnackbar(notificationId)} message={message} />
        ),
      },
    }, notificationId)
  }

  const handleAutoClick = () => {
    props.setSnackbar({
      message: 'Failed fetching data.',
      options: {
        variant: 'warning'
      },
    })
  }

  return (
    <Fragment>
      <Notifier />
      <Typography variant='h2' gutterBottom>
        Notistack Redux Example
      </Typography>
      <div style={{marginBottom: 10}}>
        <Button variant='contained' onClick={handlePersistClick}>
          Display Snackbar (Persist, timeout remove after 500ms)
        </Button>
      </div>
      <div style={{marginBottom: 10}}>
        <Button variant='contained' onClick={handlePersistManualClick}>
          Display Snackbar (Persist, manual dismiss)
        </Button>
      </div>
      <div style={{marginBottom: 10}}>
        <Button variant='contained' onClick={handleAutoClick}>
          Display Snackbar (Auto dismiss)
        </Button>
      </div>
      <div>
        <Button variant='contained' onClick={() => props.dismissAllSnackbars()}>
          Dismiss All Snackbars
        </Button>
      </div>
    </Fragment>
    )
}

const mapDispatchToProps = {
  setSnackbar,
  dismissSnackbar,
  dismissAllSnackbars,
}

export default connect(null, mapDispatchToProps)(App)
