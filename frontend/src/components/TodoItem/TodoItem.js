import React from "react";
import PropTypes from "prop-types"

function TodoItem({item, updateItem, deleteItem}) {
    let [isCompleted, setIsCompleted] = React.useState(item.is_completed);
    let [isDeleted, setIsDeleted] = React.useState(false);

    function toggleCompletedStatus() {
        setIsCompleted(!isCompleted)
        if(!updateItem(item.id, !isCompleted)){
            setIsCompleted(!isCompleted)
        }
    }

    function lazyDelete() {
        setIsDeleted(true)
        deleteItem(item.id)
    }

    return (
        <li className="list-block__item"
            style={isDeleted ? {display: 'none'} : null}>
            <input className="list-block__item-checkbox"
                   type="checkbox"
                   checked={isCompleted}
                   onChange={toggleCompletedStatus} />
            <span
                className="list-block__item-text"
                style={isCompleted ? {textDecoration: 'line-through'} : {}}>
                        {item.title}
                    </span>
            <button className="list-block__item-btn btn"
                    onClick={lazyDelete}
                    title={"Delete ToDo"}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
}

export default TodoItem