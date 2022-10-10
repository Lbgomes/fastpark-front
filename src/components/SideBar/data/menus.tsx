import { BsJournalText } from 'react-icons/bs'


export const dashboard = {
  label: (
    <>
      <div className="icon">
      </div>

      <span className="text">Início</span>
    </>
  ),
  path: '/home'
}
export const personalization = [
  {
    label: (
      <>
        <div className="icon">
        </div>
        <span className="text">Usuários</span>
      </>
    ),
    path: '/users'
  },
  {
    label: (
      <>
        <div className="icon">
        </div>

        <span className="text">Acadêmico</span>
      </>
    ),
    children: [
      {
        label: (
          <>
            <span className="text">Autores</span>
          </>
        ),
        path: '/authors'
      },
      {
        label: (
          <>
            <span className="text">Categorias</span>
          </>
        ),
        path: '/categories'
      },
      {
        label: (
          <>
            <span className="text">Conteúdo</span>
          </>
        ),
        path: '/contents'
      },
      {
        label: (
          <>
            <span className="text">Trilha</span>
          </>
        ),
        path: '/trail'
      }
    ]
  },
  {
    label: (
      <>
        <div className="icon">
          <BsJournalText />
        </div>

        <span className="text">Assinaturas</span>
      </>
    ),
    children: [
      {
        label: (
          <>
            <span className="text">Planos</span>
          </>
        ),
        path: '/plans'
      },
      {
        label: (
          <>
            <span className="text">Cupons</span>
          </>
        ),
        path: '/coupon'
      },
      {
        label: (
          <>
            <span className="text">Cobranças</span>
          </>
        ),
        path: '/charges'
      }
    ]
  }
]
export const others = {
  label: (
    <>
      <div className="icon">
      </div>

      <span className="text">Relatórios</span>
    </>
  ),
  path: '/plans'
}
