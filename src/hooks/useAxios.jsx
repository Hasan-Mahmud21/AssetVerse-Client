import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const axiosPublic = useMemo(() => {
    return axios.create({
      baseURL: "https://asset-verse-server-omega.vercel.app",
    });
  }, []);

  return axiosPublic;
};

export default useAxios;
