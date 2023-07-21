import {
  IonContent,
  IonHeader,
  IonImg,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import useSWR from "swr";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { simpleFetch } from "../fetch";

import "./Tab2.css";

const Tab2: React.FC<RouteComponentProps<{ productId?: string }>> = ({
  match,
}) => {
  const productId = match.params.productId;
  useIonViewDidEnter(() => {
    console.log("ionViewDidEnter event fired");
  });

  useIonViewDidLeave(() => {
    console.log("ionViewDidLeave event fired");
  });

  useIonViewWillEnter(() => {
    console.log("ionViewWillEnter event fired");
  });

  useIonViewWillLeave(() => {
    console.log("ionViewWillLeave event fired");
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <Suspense fallback={<IonLoading />}>
          <Link to="/tab1" className="goback">
            Go back to Tab 1
          </Link>
          <div className="content">
            <Content productId={productId} />
          </div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

const Content = ({ productId }: { productId?: string }) => {
  const { data, error, isLoading } = useSWR(
    [`https://dummyjson.com/products/${productId}`],
    simpleFetch
  );
  if (!productId)
    return <div role="alert">Please select a product from Tab 1</div>;
  if (error) return <div>Something went wrong</div>;
  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>{data.brand}</p>
      <p>{data.description}</p>
      <IonImg src={data.thumbnail} alt={data.title} />
      <p>{data.description}</p>
      {data.images.map((image: any) => (
        <IonImg key={image} src={image} alt={data.brand} />
      ))}
      <ExpensiveRender />
    </div>
  );
};

const ExpensiveRender = () => {
  // Purposefully slow down the render to show Suspense fallback
  for (let i = 0; i < 1 * 1e9; i++) {}
  return null;
};

export default Tab2;
