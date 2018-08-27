import React from "react";
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
import TextField from "@material-ui/core/TextField";
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
      open: false
    },
    create: {
      open: false,
      name: "",
      description: ""
    },
    edit: {
      open: false,
      name: "",
      clientId: "",
      clientSecret: "",
      description: ""
    },
    applications: []
  };

  handleClickOpen = () => {
    this.setState({ edit.open: true });
  };

  handleClose = () => {
    this.setState({ edit.open: false });
  };

  handleDeleteOpen = () => {
    this.setState({ delete.open: true });
  };

  handleDeleteClose = () => {
    this.setState({ delete.open: false });
  };

  handleCreateOpen = () => {
    this.setState({ create.open: true });
  };

  handleCreateClose = () => {
    this.setState({ create.open: false });
  };

  onChangeName = (event) => {
    this.setState({ valueSecret: event.target.value });
  };

  onChangeClientId = (event) => {
    this.setS
  }

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
          open={this.state.openCreate}
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
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              <DialogActions>
                <Button onClick={this.handleCreateClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleCreateClose} color="primary">
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
          open={this.state.openDelete}
          onClose={this.handleClose}
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
            <Button onClick={this.handleDeleteClose} color="primary">
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
          open={this.state.open}
          onClose={this.handleClose}
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
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Client ID"
                        id="client-id"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Client Secret"
                        id="client-secret"
                        formControlProps={{ fullWidth: true }}
                        value={this.state.valueSecret}
                        onChange={this.onChangeSecret}
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
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
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
                        key={"coba1"}
                      >
                        {"Coba"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"coba2"}
                      >
                        {"Hehe"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"coba3"}
                      >
                        {"Lala"}
                      </TableCell>
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={"coba4"}
                      >
                        {"Kentang"}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={"1"}>
                      <TableCell className={classes.tableCell} key={"key1"}>
                        {"1"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key2"}>
                        {"lalalal"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key3"}>
                        {"b"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key4"}>
                        {"lalalal"}
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
                            onClick={this.handleClickOpen}
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
                    <TableRow key={"2"}>
                      <TableCell className={classes.tableCell} key={"key1"}>
                        {"2"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key2"}>
                        {"lalalal"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key3"}>
                        {"b"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key4"}>
                        {"lalalal"}
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
                            onClick={this.handleClickOpen}
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
