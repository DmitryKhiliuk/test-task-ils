import React from "react";
import { useSelector } from "react-redux";
import {
  routeLoading,
  routeLoadingError,
} from "../reducers/routerSlice";
import DrawMap from "../components/DrawMap";
import Loader from "../components/Loader";

const Home = () => {
  const loading = useSelector(routeLoading);
  const loadingError = useSelector(routeLoadingError);

  if (loadingError) return <div>please retry...</div>;
  if (loading) return <Loader />;

  return (
    <DrawMap
      center={{ lat: 59.9342802, lng: 30.3350986 }}
      zoom={12}
    />
  );
};

export default Home;
