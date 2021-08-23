import React, {useEffect} from "react"
import PropTypes from "prop-types"
import TodoItem from "./TodoItem";
import {destroy, get, store, update} from "../../uploader";
import {useParams} from 'react-router-dom'

function TodoItems({className, fetchLists}) {
    let {id} = useParams()
    let [list, setList] = React.useState()

    function fetchList() {
        get.current_list(id)
            .then(list => {
                setList(list)
            })
            .catch(() => {
                alert('App not working now, try later.')
            })
    }

    if(!list || list.id.toString() !== id) {
        fetchList()
    }

    function createItem(title, list_id) {
        store.item(title, list_id)
            .then(() => {
                fetchLists()
                fetchList()
            })
            .catch(() => {
                alert('Task cannot be created now')
            })
    }

    function updateItem(id, is_completed) {
        update.item(id, is_completed)
            .then(() => {
                fetchLists()
                fetchList()
            })
            .catch(() => {
                fetchLists()
                fetchList()
                alert(`The status "completed" for the task #${id} cannot be changed now`)
            })
    }

    function deleteItem(id) {
        destroy.item(id)
            .then(() => {
                fetchLists()
                fetchList()
            })
            .catch(() => {
                fetchLists()
                fetchList()
                alert(`Task #${id} can't be deleted now`)
            })
    }

    let [addFormValue, setAddFormValue] = React.useState('')

    function handleChangeAddFormValue(event) {
        setAddFormValue(event.target.value)
    }

    function handleSubmitAddForm(event) {
        event.preventDefault()
        if(addFormValue){
            createItem(addFormValue, list.id)
        }
        setAddFormValue('')
    }

    return !list ? null : (
        <div className={`list-block ${className}`}>
            <h1 className="list-block__title">{list.title}</h1>
            <ul className="list-block__list">
                { list.items.map((item, index) =>
                    <TodoItem
                        item={item}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                        key={item.id + index}
                    />
                )}
            </ul>

            <form className="list-block__add-form" onSubmit={handleSubmitAddForm}>
                <input className="list-block__add-input form-control"
                       onChange={handleChangeAddFormValue}
                       value={addFormValue}
                       type="text"/>
                <button className="list-block__add-btn btn">Create ToDo</button>
            </form>
        </div>
    )
}

TodoItems.propTypes = {
    className: PropTypes.string,
}

export default TodoItems