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
import CheckinModel from '../../models/checkin'
import {
  createCheckin as createCheckinService,
  getAllCheckin
} from '../../services/checkin'
import { Container, FormContainer } from './styles'

export default function Checkin() {
  const [checkins, setCheckin] = useState({} as CheckinModel)
  const [email, setEmail] = useState('eduardo@eduardo.com')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')

  const clearData = () => {
    setPlate('')
    setColor('')
    setModel('')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const createCheckin = {
        emailFuncionario: email,
        cor: color,
        modelo: model,
        placa: plate
      }
      await createCheckinService(createCheckin)
      hideModal()
      clearData()
      getCheckin()
    } catch (e: any) {
      return alert(`deu erro ${e}`)
    }
  }
  const newCheckin = () => {
    showModal({
      title: 'Novo Checkin',
      content: (
        <>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <FormGroup>
                <Label>Modelo</Label>
                <Input type="text" onChange={(e) => setModel(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Placa</Label>
                <Input type="text" onChange={(e) => setPlate(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Cor</Label>
                <Input type="text" onChange={(e) => setColor(e.target.value)} />
              </FormGroup>
            </FormContainer>
            <Button type="submit">Criar</Button>
          </form>
        </>
      )
    })
  }
  const getCheckin = async () => {
    const checkinList = await getAllCheckin()
    if (checkinList) {
      setCheckin(checkinList)
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
        <Button onClick={newCheckin}>Novo CheckIn</Button>
      </Box>

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
