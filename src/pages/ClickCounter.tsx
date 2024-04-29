import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonBackButton, IonButtons } from '@ionic/react';

const Click_counter: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Click Counter</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonButtons slot="start">
        <IonBackButton defaultHref="/" />
      </IonButtons>
      <IonContent fullscreen className="ion-padding" style={{ backgroundColor: '#f0f0f0' }}>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <img src="https://via.placeholder.com/150" alt="Button" style={{ width: '150px', height: '150px' }} />
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <IonButton onClick={incrementCounter} expand="block" color="success" style={{ fontSize: '24px' }}>Click Me!</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <p style={{ fontSize: '32px' }}>Counter: {counter}</p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-text-center">
              <IonButton onClick={resetCounter} expand="block" color="danger" style={{ fontSize: '20px' }}>Reset</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
   </IonPage>
  );
};

export default Click_counter;
