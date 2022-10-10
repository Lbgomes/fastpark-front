import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.6rem;
  .pagination {
    font-size: 14px;
    font-weight: 600;
    display: flex;
    list-style-type: none;

    a {
      border: 1px solid #fff;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }

    li {
      &.previous {
        margin-left: 0;
      }

      &.next {
        margin-right: 0;
      }

      &.active {
        a {
          border: none;
          background-color: #e4672e;
          color: #fff;
          cursor: default;
          user-select: none;
          outline: none;
        }

        svg {
          color: var(--primary-color) !important;
        }
      }

      & + li {
        margin-right: 0;
        margin-left: 10px;
      }
    }
  }
`
