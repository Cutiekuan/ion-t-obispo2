// Tab2.tsx

import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Click Counter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="container">
          <div className="counter-container">
            <IonLabel className="counter-label">Count: {count}</IonLabel>
          </div>
          <div className="button-container">
            <IonButton onClick={incrementCounter}>Click to Increment</IonButton>
            <IonButton onClick={resetCounter}>Reset</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
