import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaceBySite } from "../../Actions/SitesAction";
import { Col } from "reactstrap";
import HotelCard from "./HotelCard";

const PlacesInSite = ({ siteId }) => {
  const { placeSites, isLoading } = useSelector((state) => state.placeSite);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaceBySite(siteId));
  }, [getPlaceBySite, siteId]);

  return (
    <>
      {!isLoading &&
        placeSites.map((item) => (
          <Col key={item._id} lg="3" md="6" sm="6" className="my-4">
            <HotelCard hotel={item} />
          </Col>
        ))}
    </>
  );
};

export default PlacesInSite;
