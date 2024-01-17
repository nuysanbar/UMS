import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AiOutlineSetting} from "react-icons/ai"
import {BsCaretDown} from "react-icons/bs"
export default function TemporaryDrawer({basicData,userRole}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/profile'>
              <ListItemIcon>
              <AiOutlineSetting/>
              </ListItemIcon>
              <ListItemText primary={"settings"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href='/home/logout'>
              <ListItemIcon>
              <AiOutlineSetting/>
              </ListItemIcon>
              <ListItemText primary={"logout"} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  return (
        <div style={{backgroundColor:"var(--bl)", color:"var(--wh)",padding:"5px 0 50px"}}>
          <div onClick={toggleDrawer("right", true)} style={{display:"inline-block",width:"45px",margin:"0 auto",position:"absolute","right":"0px"}}>
                    <img src={`http://localhost:3500/${basicData.image}`} style={{width:"25px",height:"25px",borderRadius:"20px"}} alt="profileImg" /> <br />
                    <span>me<BsCaretDown className="drop"/></span>
          </div>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}>
            {list("right")}
          </Drawer>
        </div>
  );
}