'use client'

import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForever from '@mui/icons-material/DeleteForever';
import AddBox from '@mui/icons-material/AddBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Grid, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Icon } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ToDos() {

    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTodo, setNewTodo] = useState('');
    const [todosList, setTodosList] = useState([]);

    function inputChangeHandler(e) {
        setNewTodo(e.target.value);
    }

    function addNewTodo({index}) {
        if(newTodo && newTodo.length) {
            fetch("api/todos", { method: "post", body: JSON.stringify({value: newTodo, done: false}) } ).then((response) => {
                return response.json().then((newTodo) => {
                    setTodos([...todos, newTodo]);
                    setNewTodo('');
                });
            });
            
        }
    }

    function removeTodo({ index }) {
        var remv = todos[index];
        fetch(`api/todos/${remv.id}`, { method: "delete"}).then();
        setTodos(todos.filter((v,idx) => idx!==index));
    }

    function makeCheck ({index}) {
        var tar = todos[index];
        fetch(`api/todos/${tar.id}`, { method: "put", body: JSON.stringify({value: tar.value, done: !tar.done})}).then((response) => {
        setTodos(todos.map((value) => {
            if (value.id === tar.id) {
                return {...tar, done: !tar.done};
            }
            else {
                return value;
            }
                } ))
            });
    }

    useEffect(() => {
        fetch("/api/todos", { method: "get" }).then((response) => response.ok && response.json()).then(
            todos => {
                todos && setTodos(todos);
                setIsLoading(false);
            }
        );
    }, []);

    const loadingItems = <CircularProgress/>;

    const toDoItems = isLoading ? loadingItems : todos.map((todo, idx) => {
        return <Grid item xs = {2.4}>  
        <Box key={idx} secondaryAction={
            <Button edge="end" onClick={() => removeTodo({index: idx})}><DeleteForever/></Button>   
        }>  
        <Box sx = {{width: 300, height: 300, border: 5}}>
            <Button sx ={{width: 300, height: 300}} >
                <Icon>
                    <Checkbox checked={todo.done} disableRipple onChange={() => makeCheck({index: idx})}/>
                </Icon>
                <TextField primary={todo.value}/>
            </Button>
            </Box> 
        </Box>
        </Grid>
    })

        /*let arry = [1,2,3,4,5,6,7,8,9,10];

    let items = arry.map(i => {
      return (<Grid xs = {2.4}>
        <Item>(i)</Item>
        </Grid>);
    })*/
    /* <Box sx = {{width: '100%' }}>
        <Grid container rowSpacing = {1} columnSpacing = {{ xs: 1 sm: 2 md: 3 }}
            {items}
        </Grid>
      </Box>   */

    let arry = [1,2,3,4,5];
    let arry2 = [6,7,8,9,10];
    let arry3 = [arry, arry2, arry];
    const [arryInd, setArryInd] = useState(0);

    const slider = isLoading ? loadingItems : arry3[arryInd].map((val, idx) => {
      return <Grid item xs = {2.4}>
        <Box sx = {{width: 300, height: 300, border: 5}}>
          <Item>{val}</Item>
        </Box>
      </Grid>
    })

    function sliderInc (){
      if (arryInd >= 0 && arryInd < arry3.length - 1 )
      {
        setArryInd(arryInd + 1);
      }
    }

    function sliderDec (){
      if (arryInd > 0 && arryInd <= arry3.length - 1)
      {
        setArryInd(arryInd - 1)
      }
    }

      
    return (
        <>
         <li> link: <a href="/demo_profile"> demo profile page</a>   </li>
            <h2><center>Explore</center></h2>
            <Box sx = {{ flexgrow: 1}}>
              <Grid container rowSpacing = {1} columnSpacing = {{ xs: 1 , sm: 2 , md: 0}}>
                {slider}
                {!isLoading && <ListItem key="leftArrow" secondaryAction={<IconButton sx={{mr: 216, mb: 40}} onClick={sliderDec}><ArrowBackIosIcon sx={{color: 'black'}} /></IconButton>}></ListItem> }
                {!isLoading && <ListItem key="rightrrow" secondaryAction={<IconButton sx={{mr: 0, mb: 40}} onClick={sliderInc}><ArrowForwardIosIcon sx={{color: 'black'}} /></IconButton>}>
                  </ListItem>}
              </Grid>
            </Box>

            
            <Box sx = {{ flexgrow: 1}}>
              <Grid container rowSpacing = {1} columnSpacing = {{ xs: 1 , sm: 2 , md: 0}}>
                {toDoItems}
              </Grid>
            </Box>

            {/* <List sx={{ width: '100%', maxWidth: 325 , height: '100%', maxHeight: 500}}>
                { toDoItems }
                {!isLoading && <ListItem key="newItem" secondaryAction={<IconButton edge="end" onClick={addNewTodo}><AddBox/></IconButton>}>
                    <TextField label="New ToDo Item" fullWidth variant="outlined" value={newTodo} onChange={inputChangeHandler}/> 
                </ListItem>}
            </List>
            
            <List sx={{ml: 45, mt: -62, width: '100%', maxWidth: 325, height: '100%', maxHeight: 500}}>
                { toDoItems }
                {!isLoading && <ListItem key="newItem" secondaryAction={<IconButton edge="end" onClick={addNewTodo}><AddBox/></IconButton>}>
                    <TextField label="New ToDo Item" fullWidth variant="outlined" value={newTodo} onChange={inputChangeHandler}/> 
                </ListItem>}
            </List>

            <List sx={{ml: 90, mt: -62, width: '100%', maxWidth: 325 ,height: '100%', maxHeight: 500}}>
                { toDoItems }
                {!isLoading && <ListItem key="newItem" secondaryAction={<IconButton edge="end" onClick={addNewTodo}><AddBox/></IconButton>}>
                    <TextField label="New ToDo Item" fullWidth variant="outlined" value={newTodo} onChange={inputChangeHandler}/> 
                </ListItem>}
            </List>
            <List sx={{ml: 135, mt: -62, width: '100%', maxWidth: 325 , height: '100%', maxHeight: 500}}>
                { toDoItems }
                {!isLoading && <ListItem key="newItem" secondaryAction={<IconButton edge="end" onClick={addNewTodo}><AddBox/></IconButton>}>
                    <TextField label="New ToDo Item" fullWidth variant="outlined" value={newTodo} onChange={inputChangeHandler}/> 
                </ListItem>}
            </List>
            <List sx={{ml: 180, mt: -62, width: '100%', maxWidth: 325 , height: '100%', maxHeight: 500}}>
                { toDoItems }
                {!isLoading && <ListItem key="newItem" secondaryAction={<IconButton edge="end" onClick={addNewTodo}><AddBox/></IconButton>}>
                    <TextField label="New ToDo Item" fullWidth variant="outlined" value={newTodo} onChange={inputChangeHandler}/> 
                </ListItem>}
            </List> */}
        </>
    );
}
