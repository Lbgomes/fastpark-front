import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import { HandleReport } from "../../services/report";
import { useState } from "react";
import Base64Downloader from "common-base64-downloader-react";
import { DateContainer, InputContainer, Invisible } from "./style";
import Swal from "sweetalert2";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Label from "../../components/Label";
import InputSelect from "../../components/Select";

export const Report = () => {
  const [report, setReport] = useState<any>();
  const [typeReportSelected, setTypeReportSelected] = useState(
    {} as { label: string; value: number }
  );
  const [initialDate, setInitialDate] = useState<Date>();
  const [finalDate, setFinalDate] = useState<Date>();
  const options = [
    {
      label: " Relatorio Geral",
      value: 1,
    },
    {
      label: "Relatório de atendimentos concluidos por período",
      value: 2,
    },
    {
      label: "Relatório de entrada de veiculo por periodo",
      value: 3,
    },
  ];
  const GenerateReport = async () => {
    const data = {
      type: typeReportSelected.value,
      start: `${initialDate}T00:00:00.000z`,
      end: `${finalDate}T00:00:00.000z`,
    };
    try {
      const reportString = await HandleReport(data);
      setReport(reportString.report);
    } catch {
      Swal.fire({
        title: "Erro",
        text: "Houve um erro ao gerar o relatório",
        icon: "error",
      });
    }
    setTimeout(() => {
      const button = document.querySelector(".download") as HTMLElement;
      button.click();
    }, 1);
  };
  return (
    <>
      <BreadCrumb
        crumbs={[
          <Link key={1} to="/home">
            Início
          </Link>,
          <span key={2}>Relatório</span>,
        ]}
      />

      <PageTitle>Relatório</PageTitle>
      <FormGroup>
        <InputSelect
          isMulti={false}
          options={options}
          title="teste"
          onChange={(options) => {
            setTypeReportSelected({
              label: options.label,
              value: options.value,
            });
          }}
        ></InputSelect>
        <InputContainer>
          <DateContainer>
            <Label>Data inicial</Label>
            <Input
              disabled={typeReportSelected.value === 1 ? true : false}
              required
              type="date"
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </DateContainer>
          <DateContainer>
            <Label>Data final</Label>
            <Input
              disabled={typeReportSelected.value === 1 ? true : false}
              required
              type="date"
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </DateContainer>
        </InputContainer>
      </FormGroup>
      <Button onClick={GenerateReport} id="button">
        Gerar relatório
      </Button>
      <Invisible>
        <Base64Downloader
          className="download"
          base64={`data:application/pdf;base64,${report}`}
          downloadName="pdfDownload"
        />
      </Invisible>
    </>
  );
};
