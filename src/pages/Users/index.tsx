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
import Table from "../../components/Table";
import UserForCreate from "../../models/forCreate/UserForCreate";

import UsersModel from "../../models/users";
import {
  getAllUsers,
  handleUser as handleUserService,
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
  const handleUser = async (userData: UserForCreate) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você irá desabilitar esse usuário",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, realizar checkout",
      width: 600,
      heightAuto: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateUser(userData);
          Swal.fire({
            title: "Sucesso",
            text: "Checkout criado com sucesso",
            icon: "success",
          });
          getAllUsers();
        } catch (error) {
          Swal.fire(
            "Deu ruim!",
            "Não foi possível realizar o checkout",
            "error"
          );
        }
      }
    });
  };
  const clearData = () => {
    setIdUser("");
    setEmail("");
    setName("");
  };
  const handleSubmit = async () => {
    try {
      const createCheckin = {
        id: idUser,
        name: name,
        email: email,
        disabled: false,
      };
      await updateUser(createCheckin);
      Swal.fire({
        title: "Sucesso",
        text: "Checkin criado com sucesso",
        icon: "success",
      });
      hideModal();
      clearData();
      getAllUsers();
    } catch (e: any) {
      Swal.fire({
        title: "Deu ruim",
        text: "Houve um erro ao criar o checkin",
        icon: "error",
      });
    }
  };
  const updateUserModal = () => {
    showModal({
      title: "Novo Checkin",
      content: (
        <>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <FormGroup>
                <Label>Nome</Label>
                <Input type="text" onChange={(e) => setName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="text" onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
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
                  <AiOutlineEdit className="icon-danger" />
                </div>
              </Button>
              <Button
                className="small danger"
                styleButton="attencion"
                onClick={updateUserModal}
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
