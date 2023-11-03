'use client'

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EventIcon from '@mui/icons-material/Event';
import { Card, CardContent, Box } from "@mui/material";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        creator: '',
        startTime: '',
        endTime: '',
        location: '',
        interestedCount: 0,
        goingCount: 0,
        creatorId: '123' // replace this with actual userID in future
    });

    const userId = '123'; // simulated current userID

    const [editIndex, setEditIndex] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditIndex(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleAddEvent = () => {
        if (editIndex !== null) {
            const updatedEvents = [...events];
            updatedEvents[editIndex] = newEvent;
            setEvents(updatedEvents);
            setEditIndex(null);
        } else {
            const updatedEvents = [...events, newEvent];
            setEvents(updatedEvents);
        }
        setNewEvent({
            title: '',
            creator: '',
            startTime: '',
            endTime: '',
            location: '',
            interestedCount: 0,
            goingCount: 0,
            creatorId: '123' // Reset to the default user ID after adding the event
        });
        setOpen(false);
    };

    const handleRemoveEvent = (index) => {
        const eventToRemove = events[index];
        if (eventToRemove.creatorId === userId) {
            const updatedEvents = events.filter((event, i) => i !== index);
            setEvents(updatedEvents);
        } else {
            console.log("You are not authorized to delete this event.");
        }
    };

    const handleEditEvent = (index) => {
        const eventToEdit = events[index];
        if (eventToEdit.creatorId === userId) {
            setEditIndex(index);
            setNewEvent(eventToEdit);
            setOpen(true);
        } else {
            console.log("You are not authorized to edit this event.");
        }
    };

    // track user interactions
    const [userInteractions, setUserInteractions] = useState({});

    // Function to handle "Interested" click
    const handleInterested = (index) => {
        const updatedEvents = [...events];
        const userInteracted = userInteractions[index]?.interested || false;

        if (!userInteracted) {
            updatedEvents[index].interestedCount++;
            setUserInteractions({
                ...userInteractions,
                [index]: { ...userInteractions[index], interested: true }
            });
        } else {
            updatedEvents[index].interestedCount--;
            setUserInteractions({
                ...userInteractions,
                [index]: { ...userInteractions[index], interested: false }
            });
        }

        setEvents(updatedEvents);
    };

    // Function to handle "Going" click (similar to "Interested" function)
    const handleGoing = (index) => {
        const updatedEvents = [...events];
        const userInteracted = userInteractions[index]?.going || false;

        if (!userInteracted) {
            updatedEvents[index].goingCount++;
            setUserInteractions({
                ...userInteractions,
                [index]: { ...userInteractions[index], going: true }
            });
        } else {
            updatedEvents[index].goingCount--;
            setUserInteractions({
                ...userInteractions,
                [index]: { ...userInteractions[index], going: false }
            });
        }

        setEvents(updatedEvents);
    };

    return (
        <div>
            <h2>Events</h2>
            <List>
                {events.map((event, index) => (
                    <ListItem key={index}>
                        <Card>
                            <CardContent>
                                <ListItemText
                                    primary={event.title}
                                    secondary={
                                        <>
                                            <p>Creator: {event.creator}</p>
                                            <p>Time: {event.startTime} - {event.endTime}</p>
                                            <p>Location: {event.location}</p>
                                            <Button startIcon={<ThumbUpIcon />} onClick={() => handleInterested(index)}>
                                                Interested ({event.interestedCount})
                                            </Button>
                                            <Button startIcon={<EventIcon />} onClick={() => handleGoing(index)}>
                                                Going ({event.goingCount})
                                            </Button>
                                            {event.creatorId === userId && (
                                                <>
                                                    <Button onClick={() => handleRemoveEvent(index)}>
                                                        Delete
                                                    </Button>
                                                    <Button onClick={() => handleEditEvent(index)}>
                                                        Edit
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    }
                                />
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>

            <Button
                variant="contained"
                onClick={handleClickOpen}
            >
                Add Event
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="Title"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        label="Creator"
                        name="creator"
                        value={newEvent.creator}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        label="Start Time"
                        name="startTime"
                        value={newEvent.startTime}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        label="End Time"
                        name="endTime"
                        value={newEvent.endTime}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        label="Location"
                        name="location"
                        value={newEvent.location}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    {/* Rest of form fields if need more */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAddEvent} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Events;
