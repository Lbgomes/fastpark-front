import { useEffect, useMemo, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import BreadCrumb from '../../components/BreadCrumb'
import Button from '../../components/Button/Button/index'
import Checkbox from '../../components/Checkbox'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/Table'
import CheckinModel from '../../models/checkin'
import { getAllCheckOut } from '../../services/checkout'
import { Container } from './styles'

export default function CheckOut() {
  const [checkins, setCheckin] = useState({} as CheckinModel)

  const getCheckin = async () => {
    const checkOutList = await getAllCheckOut()
    if (checkOutList) {
      setCheckin(checkOutList)
    }
  }

  useEffect(() => {
    getCheckin()
  }, [])

  const contentsToBeShown = useMemo(() => {
    return checkins.data && checkins.data.length
      ? checkins.data.map((content) => ({
          selectAll: (
            <div
              style={{
                display: 'flex',
                gap: '5px'
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
          model: content.car.modelo
        }))
      : []
  }, [checkins.data])

  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/home">
            Início
          </Link>,
          <span key={2}>CheckOut</span>
        ]}
      />

      <PageTitle>CheckOut</PageTitle>

      <Table
        headersConfig={[
          {
            headerLabel: <Checkbox />,
            propName: 'selectAll'
          },
          {
            headerLabel: <span>Responsavel </span>,
            propName: 'title'
          },
          {
            headerLabel: <span>Data e hora de entrada</span>,
            propName: 'hrEntrada'
          },
          {
            headerLabel: <span>Data e hora de saida</span>,
            propName: 'hrSaida'
          },
          {
            headerLabel: <span>Modelo</span>,
            propName: 'model'
          },
          {
            headerLabel: <span>Placa</span>,
            propName: 'Placa'
          },
          {
            headerLabel: <span>Valor final</span>,
            propName: 'price'
          }
        ]}
        itemsToShow={contentsToBeShown}
        emptyListMessage={'Não foram encontrados planos cadastradas!'}
      />
    </Container>
  )
}
