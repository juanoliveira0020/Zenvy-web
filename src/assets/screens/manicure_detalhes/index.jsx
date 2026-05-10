import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import EstabelecimentoDetalhes from "../../../components/EstabelecimentoDetalhes";

export default function Manicure_Detalhes() {
  const { id } = useParams();
  return <EstabelecimentoDetalhes estId={id} />;
}