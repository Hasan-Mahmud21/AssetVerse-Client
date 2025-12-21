import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TopRequestedBar = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["topRequestedAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-requested-assets");
      return res.data;
    }
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold mb-4">Top 5 Requested Assets</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="requests" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopRequestedBar;
