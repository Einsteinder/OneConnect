import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import createHistory from "history/createBrowserHistory"
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const history = createHistory()
const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };
  function SimpleCard(props) {
    const { classes,userData } = props;  
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            User Detail
          </Typography>
          <Typography variant="headline" component="h2">
          {userData.name}
          </Typography>

          <Typography component="p">
          {`Age: ${userData.age}`}
          <br />
          {`Gender: ${userData.gender}`}
          <br />

            {`Email: ${userData.email}`}
            <br />
            
          </Typography>
        </CardContent>

      </Card>
    );
  }
  const DetailCard = withStyles(styles)(SimpleCard);
class DetailDialog extends React.Component {
  state = {
    open: this.props.open,
    scroll: 'paper',
    data:{}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    history.goBack()

    this.setState({ open: false });
  };

  async loadData() {
    try {
      let data = await axios.get(`http://${window.location.hostname}:8080/api/users/${this.props.match.params.id}/`)
      this.setState({ data: data.data[0] })

    } catch (e) {
      console.log(e)
    }
  }
  componentDidMount() {
    this.loadData()
  }


  render() {
    const data = this.state.data
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth = {false}

          fullWidth = {true}
          aria-labelledby="scroll-dialog-title"
        >
           <DialogContent>
            <DetailCard userData = {data}/>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DetailDialog;