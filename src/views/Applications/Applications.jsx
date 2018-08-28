import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
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

class Applications extends React.Component {
  state = {
    value: 0,
    delete: {
      open: false,
      id: 0
    },
    create: {
      open: false,
      name: "",
      description: ""
    },
    edit: {
      id: 0,
      open: false,
      name: "",
      clientId: "",
      clientSecret: "",
      description: ""
    },
    applications: []
  };

  timeAgo = 5;

  constructor() {
    super();
    TimeAgo.locale(en);
    this.timeAgo = new TimeAgo("en-US");
  }

  fetchApplication() {
    fetch("http://localhost:1234/services", {
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
        this.setState({
          applications: result.data
        });
      });
  }

  componentDidMount() {
    this.fetchApplication();
  }

  handleEditOpen = event => {
    var id = event.target.value;
    console.log(id);
    this.setState({
      edit: {
        open: true,
        id: this.state.applications[id].id,
        name: this.state.applications[id].name,
        clientId: this.state.applications[id].client_id,
        clientSecret: this.state.applications[id].client_secret,
        description: this.state.applications[id].description
      }
    });
  };

  handleEditClose = () => {
    this.setState({ edit: { open: false } });
  };

  handleDeleteOpen = event => {
    this.setState({
      delete: {
        open: true,
        id: event.target.value
      }
    });
  };

  handleDeleteClose = () => {
    this.setState({ delete: { open: false } });
  };

  handleCreateOpen = () => {
    this.setState({
      create: {
        open: true,
        name: "",
        description: ""
      }
    });
  };

  handleCreateClose = () => {
    this.setState({ create: { open: false } });
  };

  handleDeleteSubmit = () => {
    fetch("http://localhost:1234/services/" + this.state.delete.id, {
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
        this.fetchApplication();
        this.setState({ delete: { open: false } });
      });
  };

  handleCreateSubmit = () => {
    fetch("http://localhost:1234/services", {
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
        application: {
          name: this.state.create.name,
          description: this.state.create.description
        }
      })
    })
      .then(res => res.json())
      .then(result => {
        this.fetchApplication();
        this.setState({ create: { open: false } });
      });
  };

  handleEditSubmit = () => {
    fetch("http://localhost:1234/services/" + this.state.edit.id, {
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
        application: {
          name: this.state.edit.name,
          id: this.state.edit.id,
          client_id: this.state.edit.clientId,
          client_secret: this.state.edit.clientSecret,
          description: this.state.edit.description
        }
      })
    })
      .then(res => res.json())
      .then(result => {
        this.fetchApplication();
        this.setState({
          edit: {
            open: false
          }
        });
      });
  };

  onCreateName = event => {
    this.setState({
      create: {
        open: true,
        name: event.target.value,
        description: this.state.create.description
      }
    });
  };

  onCreateDescription = event => {
    this.setState({
      create: {
        open: true,
        name: this.state.create.name,
        description: event.target.value
      }
    });
  };

  onChangeName = event => {
    this.setState({
      edit: {
        open: true,
        id: this.state.edit.id,
        name: event.target.value,
        clientId: this.state.edit.clientId,
        clientSecret: this.state.edit.clientSecret,
        description: this.state.edit.description
      }
    });
  };

  onChangeClientId = event => {
    this.setState({
      edit: {
        open: true,
        id: this.state.edit.id,
        name: this.state.edit.name,
        clientId: event.target.value,
        clientSecret: this.state.edit.clientSecret,
        description: this.state.edit.description
      }
    });
  };

  onChangeClientSecret = event => {
    this.setState({
      edit: {
        open: true,
        id: this.state.edit.id,
        name: this.state.edit.name,
        clientId: this.state.edit.clientId,
        clientSecret: event.target.value,
        description: this.state.edit.description
      }
    });
  };

  onChangeDescription = event => {
    this.setState({
      edit: {
        open: true,
        id: this.state.edit.id,
        name: this.state.edit.name,
        clientId: this.state.edit.clientId,
        clientSecret: this.state.edit.clientSecret,
        description: event.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        {/* Create dialog */}
        <Dialog
          fullWidth
          fullScreen
          className={classes.modalDashboard}
          TransitionComponent={Transition}
          open={this.state.create.open}
          onClose={this.handleCreateClose}
          aria-labelledby="form-dialog-title"
        >
          <GridContainer>
            <GridItem xs={12} sm={12} md={3} />
            <GridItem xs={12} sm={12} md={6}>
              <DialogTitle id="form-dialog-title">
                Create New Application
              </DialogTitle>
              <Card>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Name"
                        id="name"
                        formControlProps={{ fullWidth: true }}
                        value={this.state.create.name}
                        onChange={this.onCreateName}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        Description
                      </InputLabel>
                      <CustomInput
                        labelText="Put the description of the application."
                        id="description"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{ multiline: true, rows: 5 }}
                        value={this.state.create.description}
                        onChange={this.onCreateDescription}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              <DialogActions>
                <Button onClick={this.handleCreateClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleCreateSubmit} color="primary">
                  Create
                </Button>
              </DialogActions>
            </GridItem>
            <GridItem xs={12} sm={12} md={3} />
          </GridContainer>
        </Dialog>
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
        {/* Edit dialog */}
        <Dialog
          fullWidth
          fullScreen
          className={classes.modalDashboard}
          TransitionComponent={Transition}
          open={this.state.edit.open}
          onClose={this.handleEditClose}
          aria-labelledby="form-dialog-title"
        >
          <GridContainer>
            <GridItem xs={12} sm={12} md={3} />
            <GridItem xs={12} sm={12} md={6}>
              <DialogTitle id="form-dialog-title">Edit application</DialogTitle>
              <Card>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Name"
                        id="name"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangeName}
                        value={this.state.edit.name}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Client ID"
                        id="client-id"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.onChangeClientId}
                        value={this.state.edit.clientId}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Client Secret"
                        id="client-secret"
                        formControlProps={{ fullWidth: true }}
                        value={this.state.valueSecret}
                        onChange={this.onChangeClientSecret}
                        value={this.state.edit.clientSecret}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        Description
                      </InputLabel>
                      <CustomInput
                        labelText="Put the description of the application."
                        id="description"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{ multiline: true, rows: 5 }}
                        onChange={this.onChangeDescription}
                        value={this.state.edit.description}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              <DialogActions>
                <Button onClick={this.handleEditClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleEditSubmit} color="primary">
                  Update
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
                <h4 className={classes.cardTitleWhite}>Applications</h4>
                <p className={classes.cardCategoryWhite}>
                  Setup web applications to use Minisso for Authentication.
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
                        {"Application Name"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"desc"}
                      >
                        {"Description"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"client-id"}
                      >
                        {"Client ID"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"created-at"}
                      >
                        {"Created"}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.applications.map(function(app, i) {
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
                            {app.name}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"desc" + i}
                          >
                            {app.description}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"client-id" + i}
                          >
                            {app.client_id}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            key={"created-at" + i}
                          >
                            {this.timeAgo.format(new Date(app.created_at))}
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
                                value={app.id}
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

export default withStyles(combinedStyles)(Applications);
