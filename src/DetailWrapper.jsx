import React from "react";
import Detail from "./Detail";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailWrapper(props) {
  return <Detail navigate={useNavigate()} params={useParams()} {...props} />;
}
