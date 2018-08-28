import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import withStyles from "@material-ui/core/styles/withStyles";
// material-ui components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

import combineStyles from "util/styles.jsx";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";

const styles = {
  modalDashboard: {
    paperWidthXs: "600px",
    paperWidthSm: "600px",
    paperWidthMd: "600px"
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  createButton: {
    position: "absolute",
    top: "75%",
    right: "100%"
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Users extends React.Component {
  state = {
    value: 0,
    captionModal: "",
    delete: {
      open: false,
      id: 0
    },
    modal: {
      open: false,
      id: 0,
      firstName: "",
      lastName: "",
      gender: "",
      role: "",
      email: "",
      pass: ""
    },
    users: []
  };

  timeAgo = 5;

  EDIT_CAPTION = "Edit User";
  CREATE_CAPTION = "Create New User";

  constructor() {
    super();
    TimeAgo.locale(en);
    this.timeAgo = new TimeAgo("en-US");
  }

  fetchUser() {
    fetch("http://localhost:1234/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ users: result.data });
      });
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleEditOpen = event => {
    var id = event.target.value;
    console.log(id);
    this.setState({
      captionModal: this.EDIT_CAPTION,
      modal: {
        open: true,
        id: this.state.users[id].id,
        firstName: this.state.users[id].first_name,
        lastName: this.state.users[id].last_name,
        gender: this.state.users[id].gender,
        role: this.state.users[id].role,
        email: this.state.users[id].email,
        pass: this.state.users[id].password
      }
    });
  };

  handleEditClose = event => {
    this.setState({ modal: { open: false } });
  };

  handleEditSubmit = event => {
    fetch("http://localhost:1234/users/" + this.state.modal.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
      },
      body: JSON.stringify({
        user: {
          id: this.state.modal.id,
          first_name: this.state.modal.firstName,
          last_name: this.state.modal.lastName,
          gender: this.state.modal.gender,
          role: this.state.modal.role,
          email: this.state.modal.email,
          password: this.state.modal.pass
        }
      })
    })
      .then(res => res.json())
      .then(result => {
        this.fetchUser();
        this.setState({ modal: { open: false } });
      });
  };

  handleCreateOpen = event => {
    this.setState({
      captionModal: this.CREATE_CAPTION,
      modal: {
        open: true,
        id: 0,
        firstName: "",
        lastName: "",
        gender: "",
        role: "",
        email: "",
        pass: ""
      }
    });
  };

  handleCreateClose = event => {
    this.setState({ modal: { open: false } });
  };

  handleCreateSubmit = event => {
    fetch("http://localhost:1234/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
      },
      body: JSON.stringify({
        user: {
          id: this.state.modal.id,
          first_name: this.state.modal.firstName,
          last_name: this.state.modal.lastName,
          gender: this.state.modal.gender,
          role: this.state.modal.role,
          email: this.state.modal.email,
          password: this.state.modal.pass
        }
      })
    })
      .then(res => res.json())
      .then(result => {
        this.fetchUser();
        this.setState({ modal: { open: false } });
      });
  };

  handleDeleteOpen = event => {
    this.setState({
      delete: {
        open: true,
        id: event.target.value
      }
    });
  };

  handleDeleteClose = event => {
    this.setState({ delete: { open: false } });
  };

  handleDeleteSubmit = event => {
    fetch("http://localhost:1234/users/" + this.state.delete.id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.fetchUser();
        this.setState({ delete: { open: false } });
      });
  };

  onChangeFirstName = event => {
    this.setState({
      modal: {
        open: true,
        id: this.state.modal.id,
        firstName: event.target.value,
        lastName: this.state.modal.lastName,
        gender: this.state.modal.gender,
        role: this.state.modal.role,
        email: this.state.modal.email,
        pass: this.state.modal.pass
      }
    });
  };

  onChangeLastName = event => {
    this.setState({
      modal: {
        open: true,
        id: this.state.modal.id,
        firstName: this.state.modal.firstName,
        lastName: event.target.value,
        gender: this.state.modal.gender,
        role: this.state.modal.role,
        email: this.state.modal.email,
        pass: this.state.modal.pass
      }
    });
  };

  onChangeGender = event => {
    this.setState({
      modal: {
        open: true,
        id: this.state.modal.id,
        firstName: this.state.modal.firstName,
        lastName: this.state.modal.lastName,
        gender: event.target.value,
        role: this.state.modal.role,
        email: this.state.modal.email,
        pass: this.state.modal.pass
      }
    });
  };

  onChangeRole = event => {
    this.setState({
      modal: {
        open: true,
        id: this.state.modal.id,
        firstName: this.state.modal.firstName,
        lastName: this.state.modal.lastName,
        gender: this.state.modal.gender,
        role: event.target.value,
        email: this.state.modal.email,
        pass: this.state.modal.pass
      }
    });
  };

  onChangeEmail = event => {
    this.setState({
      modal: {
        open: true,
        id: this.state.modal.id,
        firstName: this.state.modal.firstName,
        lastName: this.state.modal.lastName,
        gender: this.state.modal.gender,
        role: this.state.modal.role,
        email: event.target.value,
        pass: this.state.modal.pass
      }
    });
  };

  onChangePass = event => {
    this.setState({
      modal: {
        open: true,
        id: this.state.modal.id,
        firstName: this.state.modal.firstName,
        lastName: this.state.modal.lastName,
        gender: this.state.modal.gender,
        role: this.state.modal.role,
        email: this.state.modal.email,
        pass: event.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        {/* Delete dialog */}
        <Dialog
          TransitionComponent={Transition}
          open={this.state.delete.open}
          onClose={this.handleEditClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteSubmit} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* Modal dialog */}
        <Dialog
          fullWidth
          fullScreen
          className={classes.modalDashboard}
          TransitionComponent={Transition}
          open={this.state.modal.open}
          onClose={this.handleCreateClose}
          aria-labelledby="form-dialog-title"
        >
          <GridContainer>
            <GridItem xs={12} sm={12} md={3} />
            <GridItem xs={12} sm={12} md={6}>
              <DialogTitle id="form-dialog-title">
                {this.state.captionModal}
              </DialogTitle>
              <Card>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="firstName"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangeFirstName}
                        value={this.state.modal.firstName}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangeLastName}
                        value={this.state.modal.lastName}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Gender"
                        id="gender"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangeGender}
                        value={this.state.modal.gender}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Role"
                        id="role"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangeRole}
                        value={this.state.modal.role}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangeEmail}
                        value={this.state.modal.email}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangePass}
                        value={this.state.modal.pass}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              <DialogActions>
                <Button onClick={this.handleEditClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={
                    this.state.captionModal == this.CREATE_CAPTION
                      ? this.handleCreateSubmit
                      : this.handleEditSubmit
                  }
                  color="primary"
                >
                  {this.state.captionModal == this.CREATE_CAPTION
                    ? "Create"
                    : "Update"}
                </Button>
              </DialogActions>
            </GridItem>
            <GridItem xs={12} sm={12} md={3} />
          </GridContainer>
        </Dialog>
        {/* Real page */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader className={classes.cardHeader} color="primary">
              <div>
                <h4 className={classes.cardTitleWhite}>Users</h4>
                <p className={classes.cardCategoryWhite}>
                  Manage users to use Minisso for Authentication.
                </p>
              </div>
              <div style={{ position: "relative" }}>
                <Button
                  className={`${classes.info} ${classes.createButton}`}
                  onClick={this.handleCreateOpen}
                >
                  Create
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes["primaryTableHeader"]}>
                    <TableRow>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"no"}
                      >
                        {"No."}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"name"}
                      >
                        {"Name"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"gender"}
                      >
                        {"Gender"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"email"}
                      >
                        {"Email"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"role"}
                      >
                        {"Role"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"last-login"}
                      >
                        {"Last Login"}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.users.map(function(user, i) {
                      return (
                        <TableRow key={i}>
                          <TableCell
                            className={classes.tableCell}
                            key={"no" + i}
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"name" + i}
                          >
                            {user.first_name + " " + user.last_name}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"gender" + i}
                          >
                            {user.gender}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"email" + i}
                          >
                            {user.email}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"role" + i}
                          >
                            {user.role}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"last-login" + i}
                          >
                            {this.timeAgo.format(new Date(user.latest_login))}
                          </TableCell>
                          <TableCell className={classes.tableActions}>
                            <Tooltip
                              id="tooltip-top"
                              title="Edit Application"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton
                                aria-label="Edit"
                                className={classes.tableActionButton}
                                onClick={this.handleEditOpen}
                                value={i}
                              >
                                <Edit
                                  className={
                                    classes.tableActionButtonIcon +
                                    " " +
                                    classes.edit
                                  }
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              id="tooltip-top-start"
                              title="Remove"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton
                                aria-label="Close"
                                className={classes.tableActionButton}
                                onClick={this.handleDeleteOpen}
                                value={user.id}
                              >
                                <Close
                                  className={
                                    classes.tableActionButtonIcon +
                                    " " +
                                    classes.close
                                  }
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    }, this)}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const combinedStyles = combineStyles(
  tableStyle,
  styles,
  tasksStyle,
  buttonStyle
);

export default withStyles(combinedStyles)(Users);
