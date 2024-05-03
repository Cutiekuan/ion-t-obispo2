
import React, { useState, useEffect, useRef } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonItemDivider,
  useIonToast
} from '@ionic/react';
//Ionicons
import { trashOutline, pencilOutline, checkmarkOutline } from 'ionicons/icons';

import './Todolist.css';

// Firebase
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './Firebase';

const Todolist: React.FC = () => {
  const [Todolist, setTodos] = useState<{ id: string; title: string; description: string; dateAdded: string; completed: boolean }[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const inputRefTitle = useRef<HTMLIonInputElement>(null);
  const inputRefDescription = useRef<HTMLIonTextareaElement>(null);
  const [present] = useIonToast();

  // Clear the input field
  const clearInput = () => {
    setNewTitle('');
    setNewDescription('');
    if (inputRefTitle.current && inputRefDescription.current) {
      inputRefTitle.current.setFocus();
    }
  };

  // Toast
  const addTodoToast = (position: 'middle') => {
    present({
      message: 'Added new Todo',
      duration: 1500,
      position: position,
    });
  };

  const editTodoToast = (position: 'middle') => {
    present({
      message: 'Changes Saved',
      duration: 1500,
      position: position,
    });
  };

  const deleteTodoToast = (position: 'middle') => {
    present({
      message: 'Todo deleted',
      duration: 1500,
      position: position,
    });
  };

  //Create Todo
  const addTodo = async () => {
    if (newTitle.trim() !== '') {
      if (editIndex !== null) {
        // Update existing todo (not implemented in this code snippet)
      } else {
        const currentDate = new Date().toISOString();
        addTodoToast('middle');
        await addDoc(collection(db, 'Todolist'), {
          title: newTitle,
          description: newDescription,
          dateAdded: currentDate,
          completed: false
        });

      }
      clearInput();
    }
  };

  //Read Firebase Data
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Todolist'), (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id, // Include the id property
        description: doc.data().description,
        title: doc.data().title,
        dateAdded: doc.data().dateAdded,
        completed: doc.data().completed
      })));
    });
    return () => unsubscribe();
  }, []);

  // Edit Handler
  const editTodo = (index: number) => {
    setEditIndex(index);
    const editedTodo = Todolist[index];
    setNewTitle(editedTodo.title);
    setNewDescription(editedTodo.description);
  };

  // Update Firebase Data
  const updateTodo = async () => {
    if (editIndex !== null) {
      editTodoToast('middle');
      const todoToUpdate = Todolist[editIndex];
      await updateDoc(doc(db, 'Todolist', todoToUpdate.id), {
        title: newTitle,
        description: newDescription,
      });
      // Clear the input fields and reset editIndex
      clearInput();
      setEditIndex(null);
    }
  };

  // Cancel Edit function
  const cancelEdit = () => {
    clearInput(); // Clear input fields
    setEditIndex(null); // Reset editIndex
  };

  // Delete Firebase Data
  const deleteTodo = async (index: number) => {
    deleteTodoToast('middle');
    const todoToDelete = Todolist[index];
    // Delete todo from Firestore
    await deleteDoc(doc(db, 'Todolist', todoToDelete.id));
  };

  // Toggle Completion
  const toggleCompletion = async (index: number) => {
    const updatedTodos = [...Todolist];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);

    // Update completion status in Firestore
    await updateDoc(doc(db, 'Todolist', Todolist[index].id), {
      completed: updatedTodos[index].completed
    });
  };

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>To Do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <img className="Todolist-img-header" alt="Silhouette of mountains" src="./src/assets/img/Todo3.png" />
     
              <IonInput
                placeholder="Type task description here"
                label="Add a task..."
                id="custom-input"
                labelPlacement="floating"
                counter={true}
                maxlength={200}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} / ${maxLength} characters remaining`}
                value={newTitle}
                onIonInput={(e) => setNewTitle(e.detail.value!)}
                ref={inputRefTitle}
              ></IonInput>
          
              {/* <IonTextarea
                placeholder="Type task description here"
                label="Description"
                id="custom-input"
                labelPlacement="floating"
                counter={true}
                maxlength={200}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} / ${maxLength} characters remaining`}
                value={newDescription}
                onIonInput={(e) => setNewDescription(e.detail.value!)}
                ref={inputRefDescription}
              ></IonTextarea> */}

            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={editIndex !== null ? updateTodo : addTodo}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" fill="clear" onClick={editIndex !== null ? cancelEdit : clearInput}>
                  {editIndex !== null ? 'Cancel' : 'Clear'}
                </IonButton>
              </IonCol>
            </IonRow>
      
        {/*Todo list output*/}
        <br></br>
        <IonItemDivider color="light">
          <IonLabel>Stuffs you need to do</IonLabel>
        </IonItemDivider>
        <IonList id="list_body">
          {Todolist
            .slice() // Create a shallow copy of the Todolist array to avoid mutating the original array
            .sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()) // Sort the array by dateAdded
            .map((todo, index) => (
              <IonItem key={index}>
                <IonLabel onClick={() => toggleCompletion(index)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  <h2>{todo.title}</h2>
                  <p>{todo.description}</p>
                  <p>{new Date(todo.dateAdded).toLocaleString()}</p>
                </IonLabel>
                <IonButton fill="clear" onClick={() => editTodo(index)}>
                  
                  <IonIcon icon={pencilOutline} />
                Edit
              </IonButton>
              <IonButton fill="clear" onClick={() => deleteTodo(index)}>
                <IonIcon icon={trashOutline} />
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Todolist;
