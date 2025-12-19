import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["my-team", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/my-team/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading team...</p>;
  }

  if (!data?.company) {
    return (
      <p className="text-center mt-10 text-gray-500">
        You are not affiliated with any company yet.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* COMPANY SELECT */}
      <div className="bg-base-100 p-6 rounded-xl shadow flex items-center gap-4">
        {data.company.logo && (
          <img
            src={data.company.logo}
            alt="Company"
            className="w-14 h-14 rounded object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-bold">{data.company.name}</h2>
          <p className="text-sm text-gray-500">Your Team</p>
        </div>
      </div>

      {/* TEAM MEMBERS */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Team Members</h3>

        {data.members.length === 0 ? (
          <p className="text-gray-500">No team members found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.members.map((member) => (
              <div key={member._id} className="card bg-base-100 shadow p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={member.photoURL || "https://i.ibb.co/0jYtM7B/user.png"}
                    alt={member.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-500">
                      {member.position || "Employee"}
                    </p>
                    <p className="text-xs">{member.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPCOMING BIRTHDAYS */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          🎂 Upcoming Birthdays (This Month)
        </h3>

        {data.birthdays.length === 0 ? (
          <p className="text-gray-500">No birthdays this month.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.birthdays.map((b) => (
              <div key={b._id} className="bg-base-100 p-4 rounded-lg shadow">
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(b.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
