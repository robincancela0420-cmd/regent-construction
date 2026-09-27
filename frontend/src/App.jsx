import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("employees");

  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchLeaves();
  }, []);

  const fetchEmployees = () => {
    fetch("http://127.0.0.1:8000/api/employees/")
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
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchLeaves = () => {
    fetch("http://127.0.0.1:8000/api/leaves/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch leaves");
        }
        return response.json();
      })
      .then((data) => {
        setLeaves(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const filteredEmployees = employees.filter((employee) => {
    const keyword = search.toLowerCase();

    return (
      employee.employee_id.toLowerCase().includes(keyword) ||
      employee.first_name.toLowerCase().includes(keyword) ||
      employee.last_name.toLowerCase().includes(keyword) ||
      employee.department.toLowerCase().includes(keyword) ||
      employee.position.toLowerCase().includes(keyword)
    );
  });

  const getLeaveTypeName = (type) => {
    const types = {
      vacation: "Vacation Leave",
      sick: "Sick Leave",
      emergency: "Emergency Leave",
      other: "Other",
    };

    return types[type] || type;
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Regent Construction</h1>
          <p>Human Resource Management System</p>
        </div>

        <div className="topbar-user">
          <span className="user-avatar">R</span>
          <span>Administrator</span>
        </div>
      </header>

      <nav className="navbar">
        <button
          className={activePage === "employees" ? "nav-link active" : "nav-link"}
          onClick={() => setActivePage("employees")}
        >
          Employees
        </button>

        <button
          className={activePage === "leaves" ? "nav-link active" : "nav-link"}
          onClick={() => setActivePage("leaves")}
        >
          Leave Management
        </button>
      </nav>

      <main className="content">
        {activePage === "employees" && (
          <>
            <div className="page-header">
              <div>
                <h2>Employees</h2>
                <p>Manage your employee records</p>
              </div>

              <button className="add-button">
                + Add Employee
              </button>
            </div>

            <section className="stats">
              <div className="stat-card">
                <span>Total Employees</span>
                <strong>{employees.length}</strong>
              </div>

              <div className="stat-card">
                <span>Active Employees</span>
                <strong>
                  {employees.filter((employee) => employee.is_active).length}
                </strong>
              </div>
            </section>

            <section className="employee-card">
              <div className="table-header">
                <div>
                  <h3>Employee List</h3>
                  <p>{filteredEmployees.length} employee(s)</p>
                </div>

                <input
                  type="text"
                  placeholder="Search employees..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              {loading && (
                <div className="message">
                  Loading employees...
                </div>
              )}

              {error && (
                <div className="message error">
                  Error: {error}
                </div>
              )}

              {!loading && !error && (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Date Hired</th>
                        <th>Salary</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                          <td>
                            <strong>{employee.employee_id}</strong>
                          </td>
                          <td>
                            {employee.first_name} {employee.last_name}
                          </td>
                          <td>{employee.email}</td>
                          <td>{employee.department}</td>
                          <td>{employee.position}</td>
                          <td>{employee.date_hired}</td>
                          <td>
                            ₱{Number(employee.salary).toLocaleString()}
                          </td>
                          <td>
                            <span
                              className={
                                employee.is_active
                                  ? "status active"
                                  : "status inactive"
                              }
                            >
                              {employee.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>
                        </tr>
                      ))}

                      {filteredEmployees.length === 0 && (
                        <tr>
                          <td colSpan="8" className="empty">
                            No employees found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {activePage === "leaves" && (
          <>
            <div className="page-header">
              <div>
                <h2>Leave Management</h2>
                <p>Manage employee leave requests</p>
              </div>

              <button
                className="add-button"
                onClick={() => setShowLeaveForm(true)}
              >
                + Apply Leave
              </button>
            </div>

            <section className="stats">
              <div className="stat-card">
                <span>Total Requests</span>
                <strong>{leaves.length}</strong>
              </div>

              <div className="stat-card">
                <span>Pending Requests</span>
                <strong>
                  {leaves.filter(
                    (leave) => leave.status === "pending"
                  ).length}
                </strong>
              </div>

              <div className="stat-card">
                <span>Approved</span>
                <strong>
                  {leaves.filter(
                    (leave) => leave.status === "approved"
                  ).length}
                </strong>
              </div>
            </section>

            <section className="employee-card">
              <div className="table-header">
                <div>
                  <h3>Leave Requests</h3>
                  <p>{leaves.length} request(s)</p>
                </div>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>
                          <strong>{leave.employee_name}</strong>
                        </td>
                        <td>{getLeaveTypeName(leave.leave_type)}</td>
                        <td>{leave.start_date}</td>
                        <td>{leave.end_date}</td>
                        <td>{leave.reason || "-"}</td>
                        <td>
                          <span className={`status ${leave.status}`}>
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {leaves.length === 0 && (
                      <tr>
                        <td colSpan="6" className="empty">
                          No leave requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {showLeaveForm && (
              <LeaveForm
                employees={employees}
                onClose={() => setShowLeaveForm(false)}
                onSuccess={() => {
                  setShowLeaveForm(false);
                  fetchLeaves();
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

function LeaveForm({ employees, onClose, onSuccess }) {
  const [form, setForm] = useState({
    employee: "",
    leave_type: "vacation",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    fetch("http://127.0.0.1:8000/api/leaves/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(JSON.stringify(data));
        }

        return data;
      })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        setError(err.message);
        setSaving(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h3>Apply Leave</h3>
            <p>Create a new leave request</p>
          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee</label>

            <select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Employee
              </option>

              {employees
                .filter((employee) => employee.is_active)
                .map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.employee_id} -{" "}
                    {employee.first_name}{" "}
                    {employee.last_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Leave Type</label>

            <select
              name="leave_type"
              value={form.leave_type}
              onChange={handleChange}
            >
              <option value="vacation">Vacation Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="emergency">Emergency Leave</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>

              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Reason</label>

            <textarea
              name="reason"
              rows="4"
              placeholder="Enter reason for leave..."
              value={form.reason}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-button"
              disabled={saving}
            >
              {saving ? "Submitting..." : "Submit Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
