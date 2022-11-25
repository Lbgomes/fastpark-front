import { useEffect, useMemo, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Label from "../../components/Label";
import { hideModal, showModal } from "../../components/modal";
import PageTitle from "../../components/PageTitle";
import InputSelect from "../../components/Select";
import Table from "../../components/Table";
import UserForCreate from "../../models/forCreate/UserForCreate";

import UsersModel from "../../models/users";
import {
  getAllUsers,
  disableUser,
  updateUser,
} from "../../services/users";
import { FormContainer } from "../Checkin/styles";
import { Container } from "./styles";

export default function Users() {
  const [user, setUser] = useState({} as UsersModel);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [idUser, setIdUser] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState(false);

  const [typeReportSelected, setTypeReportSelected] = useState(
    {} as { label: string; value: boolean }
  );

  const handleUser = async (userData: UserForCreate) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você irá desabilitar esse usuário",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desejo desativar.",
      width: 600,
      heightAuto: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDisableUser(userData.id);
          Swal.fire({
            title: "Sucesso",
            text: "Usuário atualizado com sucesso.",
            icon: "success",
          });
          getUsers();
        } catch (error) {
          Swal.fire(
            "Deu ruim!",
            "Não foi possivel atualizar o usuário.",
            "error"
          );
        }
      }
    });
  };

  const handleDisableUser = async (idUser) => {
    try {

      const bodyId = {
        id: idUser
      }

      await disableUser(bodyId);
    } catch (error) {
      Swal.fire({
        title: "Deu ruim",
        text: "Houve um erro ao atualizar o usuário.",
        icon: "error",
      });
    }
  }

  const clearData = () => {
    setIdUser("");
    setEmail("");
    setName("");
    setBody(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    
    event.preventDefault();
    setBody(true);
  };

  const createBody = async () => {
    try {
      const createCheckin = {
        id: idUser,
        name: name,
        email: email,
        disabled: typeReportSelected.value,
      };
      
      await updateUser(createCheckin);
      Swal.fire({
        title: "Sucesso",
        text: "Usuário atualizado com sucesso.",
        icon: "success",
      });
      hideModal();
      clearData();
      getUsers();
    } catch (e: any) {
      Swal.fire({
        title: "Deu ruim",
        text: "Houve um erro ao atualizar o usuário.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    
    if (body) {
      createBody();
    }
  }, [body]);

  const updateUserModal = (userName, userEmail) => {
    const options = [
      {
        label: "Ativado",
        value: false,
      },
      {
        label: "Desativado",
        value: true,
      },
    ];

    
    showModal({
      title: "Atualização de usuário",
      content: (
        <>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <FormGroup>
                <Label>Nome</Label>
                <Input type="text" defaultValue={userName} onChange={(e) => setName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="text" defaultValue={userEmail} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
              <InputSelect
                isMulti={false}
                options={options}
                title="Usuário"
                onChange={(options) => {
                  setTypeReportSelected({
                    label: options.label,
                    value: options.value,
                  });
                }}
              ></InputSelect>
            </FormContainer>
            <Button type="submit">Criar</Button>
          </form>
        </>
      ),
    });
  };

  const contentsToBeShown = useMemo(() => {
    return user.users && user.users.length
      ? user.users.map((content) => ({
        selectAll: (
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Checkbox />
          </div>
        ),
        id: content.id,
        name: content.name,
        email: content.email,
        active: (
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            {content.disabled === true ? <>sim</> : <>não</>}
          </div>
        ),
        actions: (
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <Button
              className="small danger"
              title="Alterar visibilidade"
              styleButton="edit"
              onClick={(e) => {
                setIdUser(content.id);
                setEmail(content.email);
                setName(content.name);
                
                setTimeout(() => {
                  updateUserModal(content.name, content.email);
                }, 1000);
              }}
            >
              <div>
                <AiOutlineEdit className="icon-danger" />
              </div>
            </Button>
            <Button
              className="small danger"
              styleButton="attencion"
              onClick={(e) => {
                e.preventDefault();
                handleUser({
                  disabled: !content.disabled,
                  email: content.email,
                  id: content.id,
                  name: content.name,
                });
              }}
            >
              <div>
                <AiOutlineClose className="icon-danger" />
              </div>
            </Button>
          </div>
        ),
      }))
      : [];
  }, [user]);

  const getUsers = async () => {
    try {
      const userList = await getAllUsers();
      if (userList) {
        setUser(userList);
      }
    } catch {
      alert("deu erro");
    }
  };
  useEffect(() => {
    if (contentsToBeShown && contentsToBeShown.length > 0) {
      setLoading(false);
    }
  }, [contentsToBeShown]);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/home">
            Início
          </Link>,
          <span key={2}>Usuários</span>,
        ]}
      />
      <PageTitle>Usuários</PageTitle>
      {!loading ? (
        <Table
          headersConfig={[
            {
              headerLabel: <Checkbox />,
              propName: "selectAll",
            },
            {
              headerLabel: <span>Nome</span>,
              propName: "name",
            },
            {
              headerLabel: <span>E-mail</span>,
              propName: "email",
            },
            {
              headerLabel: <span>desabilitado</span>,
              propName: "active",
            },
            {
              headerLabel: <span>Ações</span>,
              propName: "actions",
            },
          ]}
          itemsToShow={contentsToBeShown}
          emptyListMessage={"Não foram encontrados usuários cadastrados!"}
        />
      ) : null}
    </Container>
  );
}
