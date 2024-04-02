import {
    //Initial Components
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';

// CSS
//import './profile.css';

  const Home: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Home</IonTitle>
            </IonToolbar>
          </IonHeader>
          <h1>Hello World!<br></br>I am Aileen Obispo, 3rd year IT Student of NBSC<br></br>And this is my homepage.</h1>
        </IonContent>
      </IonPage>
    );
  };

  //
  export default Home;