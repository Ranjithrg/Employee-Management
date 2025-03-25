import React, { useEffect, useState } from "react";
import "./Emp.css"; // Import CSS for styling

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCompany, setFilterCompany] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCompany === "" || emp.company.name === filterCompany)
  );

  const uniqueCompanies = [...new Set(employees.map(emp => emp.company.name))];

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="title">Employee Management System</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <select
        onChange={(e) => setFilterCompany(e.target.value)}
        className="filter-dropdown"
      >
        <option value="">All Companies</option>
        {uniqueCompanies.map(company => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>
      <ul className="employee-list">
        {filteredEmployees.map((emp) => (
          <li key={emp.id} className="employee-card">
            <p className="employee-name">{emp.name}</p>
            <p className="employee-details">{emp.email} | {emp.phone}</p>
            <p className="employee-company">Company: {emp.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
