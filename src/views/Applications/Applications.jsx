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
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

import combineStyles from "util/styles.jsx";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

const styles = {
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

class Applications extends React.Component {
  state = {
    value: 0
  };
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Applications</h4>
              <p className={classes.cardCategoryWhite}>
                Setup web applications to use Minisso for Authentication.  
              </p>
            </CardHeader>
            <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes["primaryTableHeader"]}>
                    <TableRow>
                      <TableCell
                        className={classes.tableCell + " " + classes.tableHeadCell}
                        key={"coba"}
                      >
                        {"Coba"}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell + " " + classes.tableHeadCell}
                        key={"coba"}
                      >{"Hehe"}</TableCell>
                      <TableCell
                        className={classes.tableCell + " " + classes.tableHeadCell}
                        key={"coba"}
                      >{"Lala"}</TableCell>
                      <TableCell
                        className={classes.tableCell + " " + classes.tableHeadCell}
                        key={"coba"}
                      >{"Kentang"}</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={"1"}>
                      <TableCell className={classes.tableCell} key={"key"}>
                        {"1"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key"}>
                        {"lalalal"}
                      </TableCell>
                        <TableCell className={classes.tableCell} key={"key"}>
                        {"b"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key"}>
                        {"lalalal"}
                      </TableCell>
                      <TableCell className={classes.tableActions}>
                        <Tooltip
                          id="tooltip-top"
                          title="Edit Task"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Edit"
                            className={classes.tableActionButton}
                          >
                            <Edit
                              className={
                                classes.tableActionButtonIcon + " " + classes.edit
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
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon + " " + classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <TableRow key={"1"}>
                      <TableCell className={classes.tableCell} key={"key"}>
                        {"2"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key"}>
                        {"lalalal"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key"}>
                        {"b"}
                      </TableCell>
                      <TableCell className={classes.tableCell} key={"key"}>
                        {"lalalal"}
                      </TableCell>
                      <TableCell className={classes.tableActions}>
                        <Tooltip
                          id="tooltip-top"
                          title="Edit Task"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Edit"
                            className={classes.tableActionButton}
                          >
                            <Edit
                              className={
                                classes.tableActionButtonIcon + " " + classes.edit
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
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon + " " + classes.close
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
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Table on Plain Background
              </h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Country", "City", "Salary"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                  [
                    "4",
                    "Philip Chaney",
                    "$38,735",
                    "Korea, South",
                    "Overland Park"
                  ],
                  [
                    "5",
                    "Doris Greene",
                    "$63,542",
                    "Malawi",
                    "Feldkirchen in Kärnten"
                  ],
                  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const combinedStyles = combineStyles(tableStyle, styles, tasksStyle);

export default withStyles(combinedStyles)(Applications);
