import './App.scss';
import TodoLists from "../TodoList/TodoLists";
import React, {useEffect} from "react";
import TodoItems from "../TodoItem/TodoItems";
import {get} from "../../uploader"
import {Route, Switch} from "react-router-dom";

function App() {
    let [lists, setLists] = React.useState()

    function fetchLists() {
        get.lists()
            .then((lists) => {
                setLists(lists)
            })
            .catch(() => {
                alert('App not working now, try later.')
            })
    }

    useEffect(() => {
        fetchLists()
    }, [])

    return (
        <div className="container">
            <div className="row">
                <TodoLists
                    className="col"
                    lists={lists}
                    fetchLists={fetchLists}
                />
                <Switch>
                    <Route path="/lists/:id"
                           render={() => (
                               <TodoItems className="col" fetchLists={fetchLists} />
                           )}
                    />
                </Switch>
            </div>
        </div>
    )
        ;
}

export default App;
