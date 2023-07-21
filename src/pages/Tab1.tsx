import {
  IonContent,
  IonHeader,
  IonImg,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { simpleFetch } from "../fetch";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <Suspense fallback={<IonLoading />}>
          <Content />
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

const LIMIT = 100;
const Content = () => {
  const { data } = useSWR(
    [`https://dummyjson.com/products?limit=${LIMIT}`],
    simpleFetch
  );

  if (!data) return <IonLoading />;

  return (
    <ul>
      {data.products.map((product: any) => (
        <li key={product.id}>
          <Link to={`/tab2/${product.id}`}>
            <IonImg src={product.thumbnail} alt={product.title} />
            {product.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tab1;
