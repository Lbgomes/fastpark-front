import styled, { css } from "styled-components";

export const DefaultTablePagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
`;
export const DefaultTableContainer = styled.div`
  width: 100%;
`;
export const TableWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    border-radius: 0.4rem;
  `}
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Thead = styled.thead`
  ${({ theme }) => css`
    font-weight: ${theme.font.semi_bold}
    font-size: 1.7rem;
    height: 6.9rem;

    & tr {
      border-bottom: 1px solid ${theme.colors.white};
    }
  `}
`;

export const Th = styled.th`
  ${({ theme }) => css`
    font-size: 1.7rem;
    font-family: ${theme.font.semi_bold};
    padding: 1.6rem;
    text-align: left;

    &:first-child {
      width: 3%;
    }
  `}
`;

export const Tr = styled.tr`
  text-align: left;
  text-overflow: ellipsis;
`;

export const Tbody = styled.tbody`
  font-size: 1.4rem;
`;

export const Td = styled.td`
  padding: 1.6rem;
`;

export const TFoot = styled.div`
  ${({ theme }) => css`
    & th {
      font-size: 1.4rem;
      font-weight: ${theme.font.regular};
      line-height: 1.9rem;
    }
  `}
`;

export const PaginationContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.4rem;
    font-weight: ${theme.font.regular};
    height: 8.4rem;
    line-height: 1.9rem;
  `}
`;
