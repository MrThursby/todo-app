import React from "react"
import PropTypes from "prop-types"
import {destroy, store} from "../../uploader";
import TodoList from "./TodoList";
import {useHistory, useRouteMatch} from "react-router-dom";

function TodoLists({lists, fetchLists, className}) {
    let {params} = useRouteMatch('/lists/:id') ?? {params: {id: null}}
    const history = useHistory()

    function createList(title) {
        store.list(title)
            .then(() => {
                fetchLists()
            })
            .catch(() => {
                alert('List cannot be created now')
            })
    }

    function deleteList(id) {
        if(id.toString() === params.id){
            history.push('/')
        }

        destroy.list(id)
            .then(() => {
                fetchLists()
            })
            .catch(() => {
                alert('List cannot be deleted now')
            })
    }

    let [addFormValue, setAddFormValue] = React.useState('')

    function handleChangeAddFormValue(event) {
        setAddFormValue(event.target.value)
    }

    function handleSubmitAddForm(event) {
        event.preventDefault()
        if(addFormValue){
            createList(addFormValue)
        }
        setAddFormValue('')
    }

    return (
        <div className={`list-block ${className}`}>
            <h1 className="list-block__title">ToDo Lists</h1>
            <ul className="list-block__list">
                {lists instanceof Array ? lists.map((list, index) =>
                    <TodoList
                        list={list}
                        fetchCurrent={() => history.push(list.id)}
                        deleteList={deleteList}
                        key={index}
                    />
                ) : null}
            </ul>

            <form className="list-block__add-form" onSubmit={handleSubmitAddForm}>
                <input className="list-block__add-input form-control"
                       placeholder="New list..."
                       onChange={handleChangeAddFormValue}
                       value={addFormValue}
                       type="text"/>
                <button className="list-block__add-btn btn">Create</button>
            </form>
        </div>
    )
}

TodoLists.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object),
    fetchLists: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default TodoLists