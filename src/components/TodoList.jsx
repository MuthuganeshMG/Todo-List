// import React, { useState, useEffect } from 'react';
// import './TodoList.css';
// // add in icon
// import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// import { BsCheckLg } from 'react-icons/bs';

// function TodoList() {
//     const [isCompleteScreen, setIsCompleteScreen] = useState(false);
//     const [allTodos, setAllTodos] = useState([]);
//     const [newTitle, setNewTitle] = useState('');
//     const [newDescription, setNewDescription] = useState('');
//     const [completedTodos, setCompletedTodos] = useState([]);
//     const [currentEdit, setCurrentEdit] = useState("");
//     const [currentEditedItem, setCurrentEditedItem] = useState("");

//     const handleAddTodo = () => {
//         let newTodoItem = {
//             title: newTitle,
//             description: newDescription,
//         };

//         let updatedTodoArr = [...allTodos];
//         updatedTodoArr.push(newTodoItem);
//         setAllTodos(updatedTodoArr);
//         localStorage.setCurrentEditedItem('todolist', JSON.stringify(updatedTodoArr));
//     };

//     const handleDeleteTodo = index => {
//         let reducedTodo = [...allTodos];
//         reducedTodo.splice(index);

//         localStorage.setItem('todolist', JSON.stringify(reducedTodo));
//         setAllTodos(reducedTodo);
//     };

//     const handleComplete = index => {
//         let now = new Date();
//         let dd = now.getDate();
//         let mm = now.getMonth() + 1;
//         let yyyy = now.getFullYear();
//         let h = now.getHours();
//         let m = now.getMinutes();
//         let s = now.getSeconds();
//         let completedOn =
//             dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

//         let filteredItem = {
//             ...allTodos[index],
//             completedOn: completedOn,
//         };

//         let updatedCompletedArr = [...completedTodos];
//         updatedCompletedArr.push(filteredItem);
//         setCompletedTodos(updatedCompletedArr);
//         handleDeleteTodo(index);
//         localStorage.setItem(
//             'completedTodos',
//             JSON.stringify(updatedCompletedArr)
//         );
//     };

//     const handleDeleteCompletedTodo = index => {
//         let reducedTodo = [...completedTodos];
//         reducedTodo.splice(index);

//         localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
//         setCompletedTodos(reducedTodo);
//     };

//     useEffect(() => {
//         let savedTodo = JSON.parse(localStorage.getItem('todolist'));
//         let savedCompletedTodo = JSON.parse(
//             localStorage.getItem('completedTodos')
//         );
//         if (savedTodo) {
//             setTodos(savedTodo);
//         }

//         if (savedCompletedTodo) {
//             setCompletedTodos(savedCompletedTodo);
//         }
//     }, []);


//     const handleEdit = (ind, item) => {
//         console.log(ind);
//         setCurrentEdit(ind);
//         setCurrentEditedItem(item);
//     }

//     const handleUpdateTitle = (value) => {
//         setCurrentEditedItem((prev) => {
//             return { ...prev, title: value }
//         })
//     }

//     const handleUpdateDescription = (value) => {
//         setCurrentEditedItem((prev) => {
//             return { ...prev, description: value }
//         })
//     }

//     const handleUpdateToDo = () => {
//         let newToDo = [...allTodos];
//         newToDo[currentEdit] = currentEditedItem;
//         setTodos(newToDo);
//         setCurrentEdit("");
//     }



//     return (

//         <div >
//             <h1>My Todos</h1>

//             <div className="todo-wrapper">
//                 <div className="todo-input">
//                     <div className="todo-input-item">
//                         <label>Title</label>
//                         <input
//                             type="text"
//                             value={newTitle}
//                             onChange={e => setNewTitle(e.target.value)}
//                             placeholder="What's the task title?"
//                         />
//                         <label>Description</label>
//                         <input
//                             type="text"
//                             value={newDescription}
//                             onChange={e => setNewDescription(e.target.value)}
//                             placeholder="What's the task description?"
//                         />
//                         <button
//                             type="button"
//                             onClick={handleAddTodo}
//                             className="primaryBtn"
//                         >
//                             Add
//                         </button>
//                     </div>
//                     {/* <div className="todo-input-item">
//                     </div>
//                     <div className="todo-input-item">
//                     </div> */}
//                 </div>

//                 <div className="btn-area">
//                     <button
//                         className={"secondaryBtn ${isCompleteScreen === false && 'active':''}"}
//                         onClick={() => setIsCompleteScreen(false)}>

//                         Todo
//                     </button>
//                     <button
//                         className={"secondaryBtn ${isCompleteScreen === true && 'active'}"}
//                         onClick={() => setIsCompleteScreen(true)}>
//                         Completed
//                     </button>
//                 </div>

//                 <div className="todo-list">

//                     {isCompleteScreen === false &&
//                         allTodos.map((item, index) => {
//                             if (currentEdit === index) {
//                                 return (
//                                     <div className='edit__wrapper' key={index}>
//                                         <input placeholder='Updated Title'
//                                             onChange={(e) => handleUpdateTitle(e.target.value)}
//                                             value={currentEditedItem.title}
//                                         />
//                                         <textarea placeholder='Updated Title'
//                                             rows={4}
//                                             onChange={(e) => handleUpdateDescription(e.target.value)}
//                                             value={currentEditedItem.description}
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={handleUpdateToDo}
//                                             className="primaryBtn">
//                                             Update
//                                         </button>
//                                     </div>
//                                 )
//                             } else {
//                                 return (
//                                     <div className="todo-list-item" key={index}>
//                                         <div>
//                                             <h3>{item.title}</h3>
//                                             <p>{item.description}</p>
//                                         </div>

//                                         <div>
//                                             <AiOutlineDelete
//                                                 className="icon"
//                                                 onClick={() => handleDeleteTodo(index)}
//                                                 title="Delete?"
//                                             />
//                                             <BsCheckLg
//                                                 className="check-icon"
//                                                 onClick={() => handleComplete(index)}
//                                                 title="Complete?"
//                                             />
//                                             <AiOutlineEdit className="check-icon"
//                                                 onClick={() => handleEdit(index, item)}
//                                                 title="Edit?" />
//                                         </div>

//                                     </div>
//                                 );
//                             }

//                         })}

//                     {isCompleteScreen === true &&
//                         completedTodos.map((item, index) => {
//                             return (
//                                 <div className="todo-list-item" key={index}>
//                                     <div>
//                                         <h3>{item.title}</h3>
//                                         <p>{item.description}</p>
//                                         <p><small>Completed on: {item.completedOn}</small></p>
//                                     </div>

//                                     <div>
//                                         <AiOutlineDelete
//                                             className="icon"
//                                             onClick={() => handleDeleteCompletedTodo(index)}
//                                             title="Delete?"
//                                         />
//                                     </div>

//                                 </div>
//                             );
//                         })}

//                 </div>
//             </div >
//         </div >
//     );
// }

// export default TodoList;

import React, { useState, useEffect } from 'react';
import './TodoList.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function TodoList() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setAllTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [completedTodos, setCompletedTodos] = useState([]);
    const [currentEdit, setCurrentEdit] = useState(null); // Use null or -1 to indicate no edit
    const [currentEditedItem, setCurrentEditedItem] = useState({ title: '', description: '' });

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('todolist')) || [];
        const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos')) || [];

        setAllTodos(savedTodo);
        setCompletedTodos(savedCompletedTodo);
    }, []);

    const handleAddTodo = () => {
        if (!newTitle || !newDescription) {
            alert('Please fill in both title and description.');
            return;
        }

        const newTodoItem = {
            title: newTitle,
            description: newDescription,
        };

        const updatedTodoArr = [...allTodos, newTodoItem];
        setAllTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

        setNewTitle('');
        setNewDescription('');
    };

    const handleDeleteTodo = (index) => {
        const reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setAllTodos(reducedTodo);
    };

    const handleComplete = (index) => {
        const now = new Date();
        const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        const filteredItem = {
            ...allTodos[index],
            completedOn: completedOn,
        };

        const updatedCompletedArr = [...completedTodos, filteredItem];
        setCompletedTodos(updatedCompletedArr);
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));

        handleDeleteTodo(index);
    };

    const handleDeleteCompletedTodo = (index) => {
        const reducedTodo = [...completedTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
        setCompletedTodos(reducedTodo);
    };

    const handleEdit = (ind, item) => {
        setCurrentEdit(ind);
        setCurrentEditedItem(item);
    };

    const handleUpdateTitle = (value) => {
        setCurrentEditedItem((prev) => ({
            ...prev,
            title: value,
        }));
    };

    const handleUpdateDescription = (value) => {
        setCurrentEditedItem((prev) => ({
            ...prev,
            description: value,
        }));
    };

    const handleUpdateToDo = () => {
        const updatedTodoArr = [...allTodos];
        updatedTodoArr[currentEdit] = currentEditedItem;
        setAllTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
        setCurrentEdit(null); // Reset currentEdit after update
        setCurrentEditedItem({ title: '', description: '' }); // Reset currentEditedItem
    };

    return (
        <div>
            <h1>My Todos</h1>

            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="What's the task title?"
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="What's the task description?"
                        />
                        <button type="button" onClick={handleAddTodo} className="primaryBtn">
                            Add
                        </button>
                    </div>
                </div>

                <div className="btn-area">
                    <button
                        className={`secondaryBtn ${isCompleteScreen === false ? 'active' : ''}`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Todo
                    </button>
                    <button
                        className={`secondaryBtn ${isCompleteScreen === true ? 'active' : ''}`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>

                <div className="todo-list">
                    {isCompleteScreen === false &&
                        allTodos.map((item, index) => (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <AiOutlineDelete
                                        className="icon"
                                        onClick={() => handleDeleteTodo(index)}
                                        title="Delete?"
                                    />
                                    <BsCheckLg
                                        className="check-icon"
                                        onClick={() => handleComplete(index)}
                                        title="Complete?"
                                    />
                                    <AiOutlineEdit
                                        className="check-icon"
                                        onClick={() => handleEdit(index, item)}
                                        title="Edit?"
                                    />
                                </div>
                            </div>
                        ))}
                    {isCompleteScreen === true &&
                        completedTodos.map((item, index) => (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>
                                        <small>Completed on: {item.completedOn}</small>
                                    </p>
                                </div>
                                <div>
                                    <AiOutlineDelete
                                        className="icon"
                                        onClick={() => handleDeleteCompletedTodo(index)}
                                        title="Delete?"
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
