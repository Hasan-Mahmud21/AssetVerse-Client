import React from "react";

const EmployeeRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-lg p-6 bg-base-100 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Join as HR Manager
        </h2>
        <form>
          {/* Full Name */}
          <div>
            <label className="label-text font-semibold">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              //   {...register("name", { required: "Full name is required" })}
            />
            {/* {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )} */}
          </div>

          

          

          {/* Email */}
          <div>
            <label className="label-text font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              //   {...register("email", { required: "Email is required" })}
            />
            {/* {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )} */}
          </div>

          {/* Password */}
          <div>
            <label className="label-text font-semibold">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              //   {...register("password", {
              //     required: "Password is required",
              //     minLength: {
              //       value: 6,
              //       message: "Password must be at least 6 characters",
              //     },
              //   })}
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )} */}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="label-text font-semibold">Date of Birth</label>
            <input
              type="date"
              className="input input-bordered w-full"
              //   {...register("dateOfBirth", {
              //     required: "Date of birth is required",
              //   })}
            />
            {/* {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )} */}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register as Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegister;
