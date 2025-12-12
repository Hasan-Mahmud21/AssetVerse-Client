import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const axiosPublic = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:3000",
    });
  }, []);

  return axiosPublic;
};

export default useAxios;
