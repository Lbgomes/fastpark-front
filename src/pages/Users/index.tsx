import { useMemo, useState } from 'react'
import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'
import { BiErrorAlt, BiTrash } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { Link, useHistory } from 'react-router-dom'

import Box from '../../components/Box'
import BreadCrumb from '../../components/BreadCrumb'
import Button from '../../components/Button/Button/index'
import Checkbox from '../../components/Checkbox'
import FormGroup from '../../components/FormGroup'
import Label from '../../components/Label'
import { showModal } from '../../components/modal'
import PageTitle from '../../components/PageTitle'
import Table from '../../components/Table'

import contents from '../../mock/mock.json'
import { Container, FormButtons } from './styles'

export default function Users() {
  const [plans, setPlans] = useState([] as any[])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const history = useHistory()

  const createPlan = (): void => {
    history.push('create-plan')
  }
  const Modal = () => {
    return(
<>
<form action="">
    <input type="text" />
    <input type="text" />
    <input type="text" />
</form>
  </>
)

  }
  const contentsToBeShown = useMemo(() => {
      return contents && contents.length
      ? contents.map((content) => ({
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
          id: content.content_id,
          title: content.title,
          vantage: content.description,
          price: content.description,
          active: (
            <div
              style={{
                display: 'flex',
                gap: '5px'
              }}
            >
              <AiOutlineCheck size={25} />
            </div>
          ),
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
                onClick={() => showModal({ title: 'Checkin', content: (<Modal />) })}
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
  }, [  ])

  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/home">
            Início
          </Link>,
          <span key={2}>Usuários</span>
        ]}
      />

      <PageTitle>Usuários</PageTitle>

      <Box padding="0 0 20px 0">
        <Button onClick={createPlan}>Novo Usuário</Button>
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
            headerLabel: <span>Hora de entrada</span>,
            propName: 'vantage'
          },
          {
              headerLabel: <span>Estacionado</span>,
              propName: 'active'
            },
            {
              headerLabel: <span>Placa</span>,
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

function closeModal(): void {
    throw new Error('Function not implemented.')
}
