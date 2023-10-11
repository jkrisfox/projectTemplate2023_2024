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
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { PlusOneSharp } from '@mui/icons-material';

export default function ToDos() {

    const [todos, setTodos] = useState([]); // todos is state. setToDos is func that sets the state. u
    const [isLoading, setIsLoading] = useState(true);
    const [newTodo, setNewTodo] = useState('');

    function inputChangeHandler(e) {
        setNewTodo(e.target.value);
    }

    function addNewTodo() {
        if(newTodo && newTodo.length) {
            fetch("api/todos", { method: "post", body: JSON.stringify({value: newTodo, done: false}) } ).then((response) => {
                return response.json().then((newTodo) => {
                    setTodos([...todos, newTodo]);
                    setNewTodo('');
                });
            });
            
        }
    }
    // let { index } = param; "{ index: idx }"
    // the issue was that index was an object, and i was trying to pass the value of index. So 
    // enclosing index in {} extracts the value of that object. Sort of like typecasting, but not really.
    function toggleTodo({index}) {
        const updatedTodos = [...todos];
        if(updatedTodos[index])
        {
            updatedTodos[index] = {
                ...updatedTodos[index],
                done: !updatedTodos[index].done
            };
        }
        
        setTodos(updatedTodos);
    
        // Update the TODO in the database
        const todoToUpdate = updatedTodos[index];
        fetch(`/api/todos/${todoToUpdate.id}`, {
            method: "put",
            body: JSON.stringify(todoToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
         //.then(response => {
        //     if (!response.ok) {
        //         throw new Error("Network response was not ok");
        //     }
        //     return response.json();
        // })
        // .then(updatedTodoFromServer => {
        //     // Handle the updated todo from the server if necessary
        //     console.log("Todo updated successfully:", updatedTodoFromServer);
        // })
        // .catch(error => {
        //     console.error("There was a problem updating the todo: ", error);
        //     // If there's an error, you might want to revert the UI state
        //     // to reflect the actual state in the database
        //     setTodos([...todos]); // Revert the UI state
        // });
    }
    

    function removeTodo({ index }) {
        const todoToRemove = todos[index];
        fetch(`/api/todos/${todoToRemove.id}`, {method: "delete"}).then((response)=> {
            return response.json().then(()=>{
                setTodos(todos.filter((v,idx) => idx!==index));
            })
        })
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
        return <ListItem key={idx} secondaryAction={
            <IconButton edge="end" onClick={() => removeTodo({index: idx})}><DeleteForever/></IconButton>   
        }>  
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox checked={todo.done} disableRipple
                    onChange ={() => toggleTodo({ index: idx })}
                    />
                </ListItemIcon> 
                <ListItemText primary={todo.value}/>
            </ListItemButton>
        </ListItem>;
    });

    return (
        <>
            <h2>My ToDos</h2>
            <List sx={{ width: '100%', maxWidth: 500 }}>
                { toDoItems }
                {!isLoading && <ListItem key="newItem" secondaryAction={<IconButton edge="end" onClick={addNewTodo}><AddBox/></IconButton>}>
                    <TextField label="New ToDo Item" fullWidth variant="outlined" value={newTodo} onChange={inputChangeHandler}/> 
                </ListItem>}
            </List>
        </>
    );
}