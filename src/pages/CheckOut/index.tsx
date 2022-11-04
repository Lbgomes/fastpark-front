import { useEffect, useMemo, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";

import BreadCrumb from "../../components/BreadCrumb";
import Checkbox from "../../components/Checkbox";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import CheckinModel from "../../models/checkin";
import { getAllCheckOut } from "../../services/checkout";
import { Container, DateTime } from "./styles";

export default function CheckOut() {
  const [checkout, setCheckout] = useState({} as CheckinModel);
  const [active, setIsActive] = useState(false);
  const [activeOut, setIsActiveOut] = useState(false);

  const getCheckout = async () => {
    const checkOutList = await getAllCheckOut();
    if (checkOutList) {
      setCheckout(checkOutList);
    }
  };

  useEffect(() => {
    getCheckout();
  }, []);

  const contentsToBeShown = useMemo(() => {
    return checkout.data && checkout.data.length
      ? checkout.data.map((content) => ({
          selectAll: (
            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <Checkbox />
            </div>
          ),
          id: content.id,
          title: content.emailFuncionario,
          hrEntrada: content.hrEntrada,
          hrSaida: content.hrSaida,
          Placa: content.car.placa,
          price: `R$ ${content.valorFinal}`,
          model: content.car.modelo,
        }))
      : [];
  }, [checkout]);

  const OrderDate = (increase: boolean) => {
    console.log(checkout);
    if (increase === true) {
      const newDate = checkout.data.sort((a, b) =>
        a.hrEntrada < b.hrEntrada ? -1 : 1
      );
      setCheckout({ data: newDate, status: 1 });
    } else {
      const newDate = checkout.data.sort((a, b) =>
        a.hrEntrada > b.hrEntrada ? -1 : 1
      );
      setCheckout({ data: newDate, status: 1 });
    }
  };
  const OrderDateOut = (increase: boolean) => {
    console.log(checkout);
    if (increase === true) {
      const newDate = checkout.data.sort((a, b) =>
        a.hrSaida < b.hrSaida ? -1 : 1
      );
      setCheckout({ data: newDate, status: 1 });
    } else {
      const newDate = checkout.data.sort((a, b) =>
        a.hrSaida > b.hrSaida ? -1 : 1
      );
      setCheckout({ data: newDate, status: 1 });
    }
  };
  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/home">
            Início
          </Link>,
          <span key={2}>CheckOut</span>,
        ]}
      />

      <PageTitle>CheckOut</PageTitle>

      <Table
        headersConfig={[
          {
            headerLabel: <Checkbox />,
            propName: "selectAll",
          },
          {
            headerLabel: <span>Responsavel </span>,
            propName: "title",
          },
          {
            headerLabel: (
              <DateTime>
                Data e hora de entrada
                {active ? (
                  <AiFillCaretDown
                    onClick={() => {
                      OrderDate(true);
                      setIsActive(false);
                    }}
                  />
                ) : (
                  <AiFillCaretUp
                    onClick={() => {
                      OrderDate(false);
                      setIsActive(true);
                    }}
                  />
                )}
              </DateTime>
            ),
            propName: "hrEntrada",
          },
          {
            headerLabel: (
              <DateTime>
                Data e hora de saída
                {activeOut ? (
                  <AiFillCaretDown
                    onClick={() => {
                      OrderDateOut(true);
                      setIsActiveOut(false);
                    }}
                  />
                ) : (
                  <AiFillCaretUp
                    onClick={() => {
                      OrderDateOut(false);
                      setIsActiveOut(true);
                    }}
                  />
                )}
              </DateTime>
            ),
            propName: "hrSaida",
          },
          {
            headerLabel: <span>Modelo</span>,
            propName: "model",
          },
          {
            headerLabel: <span>Placa</span>,
            propName: "Placa",
          },
          {
            headerLabel: <span>Valor final</span>,
            propName: "price",
          },
        ]}
        itemsToShow={contentsToBeShown}
        emptyListMessage={"Não foram encontrados planos cadastradas!"}
      />
    </Container>
  );
}
