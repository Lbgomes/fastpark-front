import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import { HandleReport } from "../../services/report";
import { useState } from "react";
import Base64Downloader from "common-base64-downloader-react";
import { Invisible } from "./style";
import Swal from "sweetalert2";

export const Report = () => {
  const [report, setReport] = useState<any>();

  const GenerateReport = async () => {
    try {
      const reportString = await HandleReport();
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
      <Button onClick={GenerateReport} id="button">
        Gerar relatório
      </Button>
      <Invisible>
        <Base64Downloader
          className="download"
          base64={`data:application/pdf;base64,${report}`}
          downloadName="pdfDownload"
        >
          Click to download
        </Base64Downloader>
      </Invisible>
    </>
  );
};
