import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const candidatesData = [
  {
    id: 1,
    name: "John Doe",
    cv: "john_doe_cv.pdf",
    taskLink: "https://task.com/john",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    cv: "jane_smith_cv.pdf",
    taskLink: "https://task.com/jane",
    status: "pending",
  },
  {
    id: 3,
    name: "Bob Johnson",
    cv: "bob_johnson_cv.pdf",
    taskLink: "https://task.com/bob",
    status: "pending",
  },
];

const JobCandidatesTable = () => {
  const [candidates, setCandidates] = useState(candidatesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleAction = (id, action) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: action } : candidate
      )
    );
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || candidate.status === statusFilter)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Candidates</h1>
      <div className="flex mb-4 space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pr-10 border rounded-md"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="appearance-none bg-white border rounded-md py-2 pl-3 pr-10"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CV
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={candidate.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View CV
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={candidate.taskLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Task
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    candidate.status === "accepted"
                      ? "bg-green-200 text-green-800"
                      : candidate.status === "rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {candidate.status.charAt(0).toUpperCase() +
                    candidate.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-x-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      candidate.status === "accepted"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    onClick={() => handleAction(candidate.id, "accepted")}
                    disabled={candidate.status === "rejected"}
                  >
                    Accept
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      candidate.status === "rejected"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                    onClick={() => handleAction(candidate.id, "rejected")}
                    disabled={candidate.status === "accepted"}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobCandidatesTable;
