import axios from "axios";

type ReportType = {
  type: number;
  start?: string;
  end?: string;
};
export const HandleReport = async (newReport: ReportType) => {
  const Report = (
    await axios.post("http://localhost:6060/report/flowReport", newReport)
  ).data;
  return Report;
};
