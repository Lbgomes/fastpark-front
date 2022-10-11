import React, {
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState
  } from 'react'
  import { AiOutlineCheck, AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai'
  import { BiErrorAlt } from 'react-icons/bi'
  import { useHistory } from 'react-router'
  import { Link } from 'react-router-dom'
import BreadCrumb from '../../components/BreadCrumb'
import Button from '../../components/Button/Button/index'
import Checkbox from '../../components/Checkbox'
import Table from '../../components/Table'
  import ToggleSwitch from 'components/ToggleSwitch'
  import isAdmin from 'helpers/is-admin'
  import User from 'models/user'
  import moment from 'moment'
  
  import {
    deleteUserById,
    Filters,
    getUsers as getUsersService,
    updateStatusUser
  } from 'services/users'
  
  import { ReactComponent as IconCsv } from '../../assets/csv.svg'
  import { ReactComponent as IconDelete } from '../../assets/delete.svg'
  import { ReactComponent as IconImport } from '../../assets/import.svg'
  import {
    Card,
    Actions,
    Label,
    SearchContainer,
    SearchInput,
    Title
  } from './style'
  
  const itensPerPage = 20
  
  const Users: React.FC = () => {
    const [users, setUsers] = useState([] as User[])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [allUsers, setAllUsers] = useState([] as User[])
    const [selectAll, setSelectAll] = useState<boolean>(false)
    const history = useHistory()
  
    const headers = [
      { label: 'Nome', key: 'name' },
      { label: 'E-mail', key: 'email' },
      { label: 'Plano', key: 'planStr' }
    ]
  
    const createUser = (): void => {
      history.push('create-user')
    }
    const getUsers = useCallback(
      async (filters: Filters) => {
        if (search) {
          filters.search = search
        }
  
        if (filters.offset === 0) {
          delete filters.offset
        }
  
        const allUsers = await getUsersService(filters)
        if (allUsers) {
          const data = allUsers.users.map((user) => ({
            ...user,
            isAdmin: isAdmin(user.roles),
            planStr:
              !user.plan || !user.plan.length
                ? 'FREE'
                : !user.plan[0]
                ? 'DESCONHECIDO'
                : user.plan[0].title
          }))
          setUsers(data)
          setTotal(allUsers.total)
        }
      },
      [search]
    )
  
    const updateStatus = async (user: User): Promise<void> => {
      Swal.fire({
        title: '<strong>Atenção!</strong>',
        html: user.is_active
          ? 'Tem certeza que deseja inativar este usuário? Ao realizar a inativação seu plano será cancelado.'
          : 'Tem certeza que deseja ativar este usuário?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateStatusUser(user.user_id, !user.is_active)
  
            Swal.fire({
              title: 'Sucesso',
              text: 'Alteração realizada com sucesso',
              icon: 'success'
            })
  
            setUsers(
              users.map((item) => {
                if (item.user_id === user.user_id) {
                  item.is_active = !user.is_active
                }
  
                return item
              })
            )
          } catch (error) {
            console.error(error)
          }
        }
      })
    }
  
    const deleteUser = async (user: User): Promise<void> => {
      Swal.fire({
        title: '<strong>Atenção!</strong>',
        html: 'Essa operação não poderá ser desfeita. Você tem certeza que deseja continuar?',
        showCancelButton: true,
        icon: 'warning',
        cancelButtonText: 'Cancelar',
        focusConfirm: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteUserById(user.user_id)
            Swal.fire({
              title: 'Sucesso',
              text: 'Usuário excluído com sucesso.',
              icon: 'success'
            })
            await getUsers({})
          } catch (error) {
            console.error(error)
          }
        }
      })
    }
  
    const usersToBeShown = useMemo(() => {
      return users && users.length
        ? users.map((user) => ({
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
            name: user.name,
            email: user.email,
            plan:
              !user.plan || !user.plan.length
                ? 'FREE'
                : !user.plan[0]
                ? 'DESCONHECIDO'
                : user.plan[0].title,
            isAdmin: (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: '5px'
                }}
                title={
                  user.info.login_by
                    ? 'Usuário criado com conta ' +
                      user.info.login_by +
                      ' não pode ser Administrador'
                    : user.isAdmin
                    ? 'Remover permissões'
                    : 'Tornar Administrador'
                }
              >
                <AiOutlineCheck size={25} />
              </div>
            ),
            isActive: (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
  
                  gap: '5px'
                }}
                title={user.is_active ? 'Inativar Usuário' : 'Ativar Usuário'}
              >
                <ToggleSwitch label="" />
              </div>
            ),
            expiresIn: (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: '5px'
                }}
              >
                <Label>
                  {user.payment
                    ? moment(user?.payment[0]?.finish_at).format('DD/MM/YYYY')
                    : 'Invalid date'}
                </Label>
              </div>
            ),
            actions: (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: '5px'
                }}
              >
                <Button
                  onClick={() => {
                    deleteUser(user)
                  }}
                  className="small danger"
                  title="Editar Usuário"
                  styleButton="edit"
                >
                  <div>
                    <AiOutlineEdit className="icon-danger" />
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    deleteUser(user)
                  }}
                  className="small danger"
                  title="Atenção Usuário"
                  styleButton="attencion"
                >
                  <div>
                    <BiErrorAlt className="icon-danger" />
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    deleteUser(user)
                  }}
                  className="small danger"
                  title="Excluir Usuário"
                  styleButton="danger"
                >
                  <div>
                    <IconDelete className="icon-danger" />
                  </div>
                </Button>
              </div>
            ),
            status: (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: '5px'
                }}
              >
                {user.is_active && user.verified && user.term_accepted && 'Ativo'}
                {user.is_active &&
                  !user.verified &&
                  !user.term_accepted &&
                  'Primeiro login'}
                {user.deleted_at && 'Deletado'}
                {!user.is_active && 'Inativo'}
              </div>
            )
          }))
        : []
    }, [users])
  
    useEffect(() => {
      getUsers({ limit: itensPerPage, offset: (page - 1) * itensPerPage })
    }, [page])
  
    const handleGetUserSubmit = (e: FormEvent): void => {
      e.preventDefault()
  
      if (page === 1) {
        getUsers({ limit: itensPerPage, offset: (page - 1) * itensPerPage })
      } else {
        setPage(1)
      }
    }
  
    const handleGenerateAllUsersFile = async (): Promise<void> => {
      const allUsers = await getUsersService({})
      setAllUsers(
        allUsers.users.map((user) => ({
          ...user,
          planStr:
            !user.plan || !user.plan.length
              ? 'FREE'
              : !user.plan[0]
              ? 'DESCONHECIDO'
              : user.plan[0].title
        }))
      )
    }
  
    return (
      <div>
        <BreadCrumb
          crumbs={[
            <Link key={1} to="/home">
              Início
            </Link>,
            <span key={2}>Usuários</span>
          ]}
        />
  
        <SearchContainer>
          <Title>Usuários</Title>
          <SearchInput onSubmit={handleGetUserSubmit}>
            <input
              type="search"
              placeholder="Nome ou e-mail"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch size={24} />
            </button>
          </SearchInput>
        </SearchContainer>
  
        <Actions>
          <Button onClick={createUser}>
            <span>Criar usuário</span>
          </Button>
  
          {allUsers.length ? (
            <Button>
              <CSVLink
                filename={`sgda-todos-usuarios.csv`}
                data={allUsers}
                headers={headers}
                className="csv-download-button"
              >
                <IconCsv />
                <span>exportar todos usuários</span>
              </CSVLink>
            </Button>
          ) : (
            <Button onClick={handleGenerateAllUsersFile}>
              <IconCsv />
              <span>EXPORTAR SELEÇÃO ATUAL</span>
            </Button>
          )}
  
          <Button>
            <CSVLink
              filename={`sgda-usuarios-pagina-${page}.csv`}
              data={users}
              headers={headers}
              className="csv-download-button"
            >
              <IconImport />
              <span>EXPORTAR TODOS OS USUÁRIOS</span>
            </CSVLink>
          </Button>
        </Actions>
  
        <Card>
          <h2>Total de Usuários</h2>
          <span>{total}</span>
        </Card>
  
        <Table
          foot={true}
          usePagination={false}
          headersConfig={[
            {
              headerLabel: <Checkbox />,
              propName: 'selectAll'
            },
            {
              headerLabel: <span>Nome</span>,
              propName: 'name'
            },
            {
              headerLabel: <span>E-mail</span>,
              propName: 'email'
            },
            {
              headerLabel: <span>Plano</span>,
              propName: 'plan'
            },
            {
              headerLabel: <span>Data de Expiração</span>,
              propName: 'expiresIn'
            },
            {
              headerLabel: <span>Admin</span>,
              propName: 'isAdmin'
            },
            {
              headerLabel: <span>Status</span>,
              propName: 'status'
            },
            {
              headerLabel: <span>Ações</span>,
              propName: 'actions'
            }
          ]}
          items={usersToBeShown}
          emptyListMessage={'Não foram encontrados usuários!'}
        />
      </div>
    )
  }
  
  export default Users