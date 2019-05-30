import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  card: {
      maxWidth: 400,
      minWidth: 344,
  },
  typography: {
      fontWeight: 'bold',
  },
  actionRoot: {
      padding: '8px 8px 8px 16px',
      backgroundColor: '#fddc6c',
  },
  icons: {
      marginLeft: 'auto',
  },
  button: {
      padding: '8px 8px',
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
      }),
  },
})

class SnackMessage extends React.Component {
  render() {
    const { classes, message } = this.props
    return (
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant="subtitle2" className={classes.typography}>{message}</Typography>
          <div className={classes.icons}>
            <IconButton className={classes.button} onClick={() => this.props.handleDismiss()}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    )
  }
}

SnackMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDismiss: PropTypes.func.isRequired,
}

export default withStyles(styles)(SnackMessage)