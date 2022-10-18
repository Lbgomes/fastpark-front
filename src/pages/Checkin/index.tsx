import { useEffect, useMemo, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { Link, useHistory } from 'react-router-dom'

import Box from '../../components/Box'
import BreadCrumb from '../../components/BreadCrumb'
import Button from '../../components/Button/Button/index'
import Checkbox from '../../components/Checkbox'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/Table'

import CheckinModel from '../../models/checkin'
import { getAllCheckin } from '../../services/checkin'
import { Container } from './styles'

export default function Checkin() {
  const [checkins, setCheckin] = useState({} as CheckinModel)
  console.log(checkins)
  const history = useHistory()

  const createPlan = (): void => {
    history.push('create-plan')
  }
  const getCheckin = async() => {
    const checkinList = await getAllCheckin()
    if(checkinList) {
        setCheckin(checkinList)
    }
  }
useEffect(() => {
    getCheckin()
}, [])
    console.log()
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
          <span key={2}>CheckIn</span>
        ]}
      />

      <PageTitle>CheckIn</PageTitle>

      <Box padding="0 0 20px 0">
        <Button onClick={createPlan}>Novo CheckIn</Button>
      </Box>

      <Table
        headersConfig={[
          {
            headerLabel: <Checkbox />,
            propName: 'selectAll'
          },
          {
            headerLabel: <span>Responsavel  </span>,
            propName: 'title'
          },
          {
            headerLabel: <span>Data e hora de entrada</span>,
            propName: 'hrEntrada'
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