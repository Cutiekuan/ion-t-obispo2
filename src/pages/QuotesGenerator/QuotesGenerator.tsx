import React, { useState, useEffect, useRef } from 'react';
import {
  IonAlert,
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
  IonTitle,
  IonToolbar,
  IonItemDivider,
  IonTextarea,
  useIonToast
} from '@ionic/react';
//Ionicons
import { trashOutline, pencilOutline } from 'ionicons/icons';

import './QuotesGenerator.css';

// Firebase
import { collection, addDoc, onSnapshot,updateDoc,doc, deleteDoc} from 'firebase/firestore';
import { db } from './Firebase';

const QuotesGenerator: React.FC = () => {

  const [quotesgenerator, readQuotesGenerator] = useState<{ id: string; title: string; description: string;dateAdded: string; }[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const inputRefTitle = useRef<HTMLIonInputElement>(null);
  const inputRefDescription = useRef<HTMLIonTextareaElement>(null);
  const [present] = useIonToast();









  //THIS IS FROM THE OLD CODE//

  const [showAlert, setShowAlert] = useState(false);
  const [randomIndex, setRandomIndex] =  useState<number | null>(null); // State to store random index

  // Function to generate a random index
  const generateRandomIndex = () => {
    return Math.floor(Math.random() * quotesgenerator.length);
  };

  // Function to generate a random message
  const renderRandomMessage = () => {
    if (randomIndex !== null) {
      return quotesgenerator[randomIndex].title;
    } else {
      return ''; // Return empty string if randomIndex is null
    }
  };

 // Function to handle opening of the alert
 const handleOpenAlert = () => {
  const newIndex = generateRandomIndex();
  setRandomIndex(newIndex);
  setShowAlert(true);
};

// Function to handle closing of the alert
const handleAlertDismiss = () => {
  setRandomIndex(0); // Reset the index to 0
  setShowAlert(false); // Hide the alert
};

  //THIS IS FROM THE OLD CODE//










  // Clear the input field
  const clearInput = () => {
    setNewTitle('');
    setNewDescription('');
    if (inputRefTitle.current && inputRefDescription.current) {
      inputRefTitle.current.setFocus();
    }
  };

  // Toast
  const addQuoteToast = (position: 'middle') => {
    present({
      message: 'Added new Quote',
      duration: 1500,
      position: position,
    });
  };

  const editQuoteToast = (position: 'middle') => {
    present({
      message: 'Changes Saved',
      duration: 1500,
      position: position,
    });
  };

  const deleteQuoteToast = (position: 'middle') => {
    present({
      message: 'Quote deleted',
      duration: 1500,
      position: position,
    });
  };

  //Create Quote
  const addQuote = async () => {
    if (newTitle.trim() !== '') {
      if (editIndex !== null) {
        // Update existing quote (not implemented in this code snippet)
      } else {
        const currentDate = new Date().toISOString(); 
        addQuoteToast('middle');
        await addDoc(collection(db, 'quotesgenerator'), {
          title: newTitle,
          description: newDescription,
          dateAdded: currentDate
        });
        
      }
      clearInput();
    }
  };

  //Read Firebase Data
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'quotesgenerator'), (snapshot) => {
      readQuotesGenerator(snapshot.docs.map(doc => ({
        id: doc.id, // Include the id property
        description: doc.data().description,
        title: doc.data().title,
        dateAdded: doc.data().dateAdded
      })));
    });
    return () => unsubscribe();
  }, []);

// Edit Handler
const editQuote = (index: number) => {
  setEditIndex(index);
  const editedQuote = quotesgenerator[index];
  setNewTitle(editedQuote.title);
  setNewDescription(editedQuote.description);
};

// Update Firebase Data
const updateQuote = async () => {
  if (editIndex !== null) {
    editQuoteToast('middle');
    const quoteToUpdate = quotesgenerator[editIndex];
    await updateDoc(doc(db, 'quotesgenerator', quoteToUpdate.id), {
      title: newTitle,
      description: newDescription,
    });
    // Clear the input fields and reset editIndex
    clearInput();
    setEditIndex(null);
  }
};

//Cancel Edit function
const cancelEdit = () => {
  clearInput(); // Clear input fields
  setEditIndex(null); // Reset editIndex
};

// Delete Firebase Data
const deleteQuote = async (index: number) => {
  deleteQuoteToast('middle');
  const quoteToDelete = quotesgenerator[index];
  // Delete quote from Firestore
  await deleteDoc(doc(db, 'quotesgenerator', quoteToDelete.id));
};

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Quotes Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard id="card_body">
          <IonCardHeader>
            <IonCardTitle>
              <IonInput
                placeholder="Type your quote here"
                label="Add a quote..."
                id="custom-input"
                labelPlacement="floating"
                counter={true}
                maxlength={200}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} / ${maxLength} characters remaining`}
                value={newTitle}
                onIonInput={(e) => setNewTitle(e.detail.value!)}
                ref={inputRefTitle}
              ></IonInput>
            </IonCardTitle>
            <IonCardSubtitle>
              <IonTextarea 
                placeholder="Type quote description here"
                label="Description"
                id="custom-input"
                labelPlacement="floating"
                counter={true}
                maxlength={200}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} / ${maxLength} characters remaining`}
                value={newDescription}
                onIonInput={(e) => setNewDescription(e.detail.value!)}
                ref={inputRefDescription}
              ></IonTextarea>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={editIndex !== null ? updateQuote : addQuote}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </IonButton>
              </IonCol>
              <IonCol> 
                <IonButton expand="block" fill="clear" onClick={editIndex !== null ? cancelEdit : clearInput}>
                  {editIndex !== null ? 'Cancel' : 'Clear'}
                </IonButton>
              </IonCol>
            </IonRow>      
          </IonCardContent>
        </IonCard>



        <IonRow>
          <IonCol size="" push="">
            <IonButton id="present-alert" color="success" expand="full" onClick={handleOpenAlert}>Click me</IonButton> 
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={handleAlertDismiss} // Call the handleAlertDismiss function when the alert is closed
              header="Aileen says"
              subHeader=""
              message={renderRandomMessage()}
              buttons={['Close']}
              id="alert_quote"
            />
          </IonCol>
        </IonRow>


        {/*Todo list output*/}
        <br></br>
        <IonItemDivider color="light">
          <IonLabel style={{color: 'white'}}>Quotes you have saved</IonLabel>
        </IonItemDivider>
        <IonList id="list_body">
          {quotesgenerator
            .slice() // Create a shallow copy of the quotesgenerator array to avoid mutating the original array
            .sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()) // Sort the array by dateAdded
            .map((quote, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{quote.title}</h2>
                <p>{quote.description}</p>
                <p>{new Date(quote.dateAdded).toLocaleString()}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => editQuote(index)}>
                <IonIcon icon={pencilOutline} />
              </IonButton>
              <IonButton fill="clear" onClick={() => deleteQuote(index)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList> 
      </IonContent>
    </IonPage>
  );
};

export default QuotesGenerator;
