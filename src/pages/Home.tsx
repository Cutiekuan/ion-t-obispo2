import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonTextarea,
  IonButton,
  IonIcon,
  IonFooter,
  IonText,
} from '@ionic/react';
import { camera, videocam, images, notifications, chatbubbles, person } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
          <IonButton color="light" slot="end">
            <IonIcon icon={chatbubbles} />
          </IonButton>
          <IonButton color="light" slot="end">
            <IonIcon icon={notifications} />
          </IonButton>
          <IonButton color="light" slot="end">
            <IonIcon icon={person} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Post Section */}
        <IonList>
          {/* Post Status */}
          <IonItem>
            <IonAvatar slot="start">
              <img alt="Silhouette of mountains" src="../src/assets/img/PROFPIC_AILEEN_PNG.png" />
            </IonAvatar>
            <IonTextarea autoGrow placeholder="What's on your mind?" />
          </IonItem>
          {/* End Post Status */}

          {/* Add more posts here */}

        </IonList>

        {/* Photos, Videos, and Reels Section */}
        <IonFooter>
          <IonToolbar color="primary">
            <IonButton color="light" slot="start">
              <IonIcon icon={camera} />
              <IonText>Photos</IonText>
            </IonButton>
            <IonButton color="light" slot="start">
              <IonIcon icon={videocam} />
              <IonText>Videos</IonText>
            </IonButton>
            <IonButton color="light" slot="start">
              <IonIcon icon={images} />
              <IonText>Reels</IonText>
            </IonButton>
          </IonToolbar>
        </IonFooter>

        <img alt="Silhouette of mountains" src="../src/assets/img/PROFPIC_AILEEN_PNG.png" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
