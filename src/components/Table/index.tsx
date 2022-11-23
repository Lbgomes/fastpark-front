import React, { useEffect, useState } from "react";

import Pagination from "../Pagination";

import * as S from "./style";
interface HeaderConfig {
  propName: string;
  headerLabel: React.ReactElement;
  noWrap?: boolean;
  order?: (items: any, currentOrder: string) => void;
  attributes?: React.StyleHTMLAttributes<HTMLElement>;
}

interface ITableProps {
  headersConfig: HeaderConfig[];
  emptyListMessage?: string;
  handleChangePage?: (newPage: number) => void;
  foot?: boolean;
  totalPages?: number;
  itemsToShow?: unknown[];
  actualPage?: number;
  setPage?: (any) => void;
}

interface ExtendedWindow extends Window {
  $clamp: any;
}

declare let window: ExtendedWindow;

const Table: React.FC<ITableProps> = ({
  headersConfig,
  emptyListMessage,
  totalPages,
  itemsToShow,
  actualPage,
  setPage,
  foot = false,
}) => {
  const [items, setItems] = useState([] as any[]);
  const removeAccentuation = (str: string) => {
    const com_acento = `ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ`;
    const sem_acento = `AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr`;
    let novastr = "";
    for (let i = 0; i < str.length; i++) {
      let troca = false;
      for (let a = 0; a < com_acento.length; a++) {
        if (str.substr(i, 1) == com_acento.substr(a, 1)) {
          novastr += sem_acento.substr(a, 1);
          troca = true;
          break;
        }
      }
      if (troca == false) {
        novastr += str.substr(i, 1);
      }
    }
    return novastr;
  };

  const configureDefaultOrder = () => {
    for (const headerConfig of headersConfig) {
      if (!headerConfig.order) {
        const firstItem = items && items.length && items[0];
        if (firstItem) {
          const itemProp = firstItem[headerConfig.propName];
          if (
            !itemProp ||
            (itemProp &&
              (typeof itemProp === "string" || typeof itemProp === "number"))
          ) {
            headerConfig.order = (localItems: any[], currentOrder: string) => {
              setItems([
                ...items.sort((a, b) => {
                  const isDescendant =
                    currentOrder.includes(headerConfig.propName) &&
                    currentOrder
                      .replace(headerConfig.propName, "")
                      .includes("asc");

                  const treatedAProp = a[headerConfig.propName]
                    ? removeAccentuation(
                        `${a[headerConfig.propName]}`.trim().toLocaleLowerCase()
                      )
                    : "";
                  const treatedBProp = b[headerConfig.propName]
                    ? removeAccentuation(
                        `${b[headerConfig.propName]}`.trim().toLocaleLowerCase()
                      )
                    : "";

                  if (isDescendant) {
                    return treatedAProp < treatedBProp ? 1 : -1;
                  } else {
                    return treatedAProp < treatedBProp ? -1 : 1;
                  }
                }),
              ]);
            };
          }
        }
      }
    }
  };

  useEffect(() => {
    configureDefaultOrder();
  }, [headersConfig, items]);

  useEffect(() => {
    if (window.$clamp) {
      const tableTds = Array.from(document.querySelectorAll(".table-td"));
      for (const td of tableTds) {
        window.$clamp(td, { clamp: 3 });
      }
    }
  }, [items]);

  // We start with an empty list of items.
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Invoke when user click to request another page.

  return (
    <S.TableWrapper>
      <S.Table>
        <S.Thead>
          <S.Tr>
            {!!headersConfig &&
              headersConfig.map((headerConfig) => (
                <S.Th key={headerConfig.propName}>
                  {headerConfig.headerLabel}
                </S.Th>
              ))}
          </S.Tr>
        </S.Thead>

        <S.Tbody>
          {itemsToShow && itemsToShow.length ? (
            itemsToShow.map((item, index) => (
              <S.Tr key={index}>
                {item &&
                Object.keys(item).length &&
                headersConfig &&
                headersConfig.length ? (
                  headersConfig.map((headerConfig) => (
                    <S.Td
                      key={headerConfig.propName}
                      style={{
                        whiteSpace: headerConfig.noWrap ? "nowrap" : "normal",
                        ...headerConfig.attributes?.style,
                      }}
                    >
                      {typeof item[headerConfig.propName] === "boolean" ? (
                        true
                      ) : (
                        <span title={item[headerConfig.propName]}>
                          {item[headerConfig.propName]}
                        </span>
                      )}
                    </S.Td>
                  ))
                ) : (
                  <></>
                )}
              </S.Tr>
            ))
          ) : (
            <S.Tr>
              <S.Td
                style={{ textAlign: "center" }}
                colSpan={headersConfig.length}
              >
                {emptyListMessage || "Não foram fornecidos itens para a lista"}
              </S.Td>
            </S.Tr>
          )}
        </S.Tbody>
      </S.Table>
      {totalPages > 0 && (
        <S.PaginationContainer>
          <Pagination
            totalPages={totalPages}
            setPage={setPage}
            selected={actualPage}
          />
        </S.PaginationContainer>
      )}
    </S.TableWrapper>
  );
};

export default Table;
