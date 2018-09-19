import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchUsers } from './actions'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserDetail from './UserDetail'
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


class SimpleTable extends React.Component {

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        const { classes, users,isLoading } = this.props;

        return (
            <Router>

                <Paper className={classes.root}>
                    {isLoading ? <LinearProgress /> : 
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow >
                                <TableCell>{isLoading}Name</TableCell>
                                <TableCell >Age</TableCell>
                                <TableCell >Gender</TableCell>
                                <TableCell >Email</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users.map(d => {
                                return (

                                    <TableRow key={d._id}>

                                        <TableCell ><Link to={`/users/${d._id}`}>{d.name}</Link></TableCell>
                                        <TableCell >{d.age}</TableCell>
                                        <TableCell >{d.gender}</TableCell>
                                        <TableCell >{d.email}</TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>

                    </Table>}
                    <Route path="/users/:id/"
                        render={(props) => <UserDetail {...props} open={true} />}

                    />

                </Paper>
            </Router>

        )

    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
    {
        users: state.users,
        isLoading: state.itemIsLoading

    })

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),

})

export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(SimpleTable));
