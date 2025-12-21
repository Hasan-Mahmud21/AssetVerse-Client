import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#2563eb", "#f97316"];

const ReturnablePie = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["returnableAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/returnable-vs-non");
      return res.data;
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold mb-4">Returnable vs Non-returnable</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReturnablePie;
