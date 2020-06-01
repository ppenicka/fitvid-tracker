import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'right',
    width: '100%',
    maxWidth: 360,
    margin: '2%',
    backgroundColor: theme.palette.background.paper,
  },
  div: {
    width: '30%',
    margin: '2%',
  },
  difficulty: {
      textAlign: "left",
      marginLeft: '8%',
  },
  rootSearch: {
    margin: '2%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButtonSearch: {
    padding: 10,
  }
}));

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

export default function FilterWorkouts({handleCheckBoxChange,handleInputChange}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    handleCheckBoxChange(value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className={classes.div} >
      <Paper component="form" className={classes.rootSearch}>
            <InputBase
              className={classes.inputSearch}
              placeholder="Search Workouts..."
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <IconButton
              type="submit"
              className={classes.iconButtonSearch}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Card className={classes.root}>
          <List>
              <div className={classes.difficulty}>
          <p>Difficulty:</p>
          </div>
            {['easy', 'medium', 'hard'].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(value)}

                >
                  <ListItemIcon
                  >
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      color={'primary'}
                      labelStyle={{ color: 'green' }}
                      iconStyle={{ fill: 'black' }}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItem>
              );
            })}
          </List>
        </Card>
      </ThemeProvider>
    </div>
  );
}
