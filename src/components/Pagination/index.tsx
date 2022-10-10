import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useHistory } from 'react-router-dom'

import { Container } from './style'

interface PaginationProps {
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  selected: number
}

interface PaginationData {
  selected: number
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  setPage,
  selected = 1
}) => {
  const [initialPage, setInitialPage] = useState(0)
  const history = useHistory()

  const handlePageClick = (data: PaginationData) => {
    setPage(data.selected + 1)
    if (data.selected > 0) {
      history.push({
        search: `?page=${data.selected + 1}`
      })
    } else {
      history.push({
        search: ''
      })
    }
  }

  useEffect(() => {
    if (history.location.search) {
      const page = history.location.search.split('?page=')
      const currentPage = parseInt(page[1])
      setInitialPage(currentPage - 1)
    }
  }, [history.location.search])
  return (
    <Container>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        forcePage={initialPage}
      />
    </Container>
  )
}

export default Pagination
