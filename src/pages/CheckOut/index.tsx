import { useEffect, useMemo, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { Link, useHistory } from 'react-router-dom'

import Box from '../../components/Box'
import BreadCrumb from '../../components/BreadCrumb'
import Button from '../../components/Button/Button/index'
import Checkbox from '../../components/Checkbox'
import FormGroup from '../../components/FormGroup'
import Input from '../../components/Input'
import Label from '../../components/Label'
import { hideModal, showModal } from '../../components/modal'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/Table'
import { useUserStore } from '../../GlobalState'
import CheckinModel from '../../models/checkin'
import {
  createCheckin as createCheckinService,
  getAllCheckin,
  getAllCheckOut
} from '../../services/checkin'
import { Container, FormContainer } from './styles'

export default function CheckOut() {
  const [checkins, setCheckin] = useState({} as CheckinModel)
  const userStore = useUserStore()

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
        price: content.valorFinal,
        model: content.car.modelo,
        actions: (
          <div
            style={{
              display: 'flex',
              gap: '5px'
            }}
          >
            <Button
              className="small danger"
              title="Editar Usuário"
              styleButton="edit"
            >
              <div>
                <AiOutlineEdit className="icon-danger" />
              </div>
            </Button>
            <Button
              className="small danger"
              title="Atenção Usuário"
              styleButton="attencion"
            >
              <div>
                <BiErrorAlt className="icon-danger" />
              </div>
            </Button>
          </div>
        )
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
          },
          {
            headerLabel: <span>Ações</span>,
            propName: 'actions'
          }
        ]}
        itemsToShow={contentsToBeShown}
        emptyListMessage={'Não foram encontrados planos cadastradas!'}
      />
    </Container>
  )
}
