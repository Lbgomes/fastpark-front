import axios from "axios";

export const HandleReport = async () => {
  const Report = (await axios.post("http://localhost:6060/report/flowReport"))
    .data;
  return Report;
};
