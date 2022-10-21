import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

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
  getAllCheckin
} from '../../services/checkin'
import { createCheckOut } from '../../services/checkout'
import { Container, FormContainer } from './styles'

export default function Checkin() {
  const [checkins, setCheckin] = useState({} as CheckinModel)
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')
  const [body, setBody] = useState(false)
  const userStore = useUserStore()

  const clearData = () => {
    setPlate('')
    setColor('')
    setModel('')
    setBody(false)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setBody(true)
  }

  const handleCheckout = async (checkinId: string) => {
    event.preventDefault()

    Swal.fire({
      title: 'Você tem certeza?',
      text: 'O checkout não poderá ser desfeito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, realizar checkout',
      width: 600,
      heightAuto: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await createCheckOut(checkinId)
          Swal.fire({
            title: 'Sucesso',
            text: 'Checkin criado com sucesso',
            icon: 'success'
          })
          getCheckin()
        } catch (error) {
          Swal.fire(
            'Deu ruim!',
            'Não foi possível realizar o checkout',
            'error'
          )
        }
      }
    })
  }
  const createBody = async () => {
    try {
      const createCheckin = {
        emailFuncionario: userStore.userEmail,
        cor: color,
        modelo: model,
        placa: plate
      }
      await createCheckinService(createCheckin)
      Swal.fire({
        title: 'Sucesso',
        text: 'Checkin criado com sucesso',
        icon: 'success'
      })
      hideModal()
      clearData()
      getCheckin()
    } catch (e: any) {
      Swal.fire({
        title: 'Deu ruim',
        text: 'Houve um erro ao criar o checkin',
        icon: 'error'
      })
    }
  }

  useEffect(() => {
    if (body) {
      createBody()
    }
  }, [body])

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
                onClick={() => handleCheckout(content.id)}
              >
                <div>
                  <AiOutlineEdit className="icon-danger" />
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
            headerLabel: <span>Responsavel</span>,
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
