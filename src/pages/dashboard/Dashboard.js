import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect( ()=> {
        const fetchEmployees = async() => {
            try {
                const response = await fetch("http://localhost:8080/api/employee");
                const data = await response.json();

                setEmployees(data);
            } catch (err) {
                console.error("Error fetching employees: ", err.message);
            }
        }

        fetchEmployees();

    }, []);

    const handleDelete = async (employeeId) => {
        try {
         const response = await fetch('http://localhost:8080/api/employee/'+employeeId, {
            method: "DELETE"
         });

         if (response.ok) {
            setEmployees((prevEmployees) => {
                return prevEmployees.filter((emp) => emp.id !== employeeId)
            })
            console.log(employees);
            
         }
        //  fetchEmployees();

        }
        catch (err) {

        }
    }

    const handleUpdate = (employeeId) => {
        navigate("/employee/"+employeeId);
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Employees</h1>

                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                { employees && employees.length>0 ? employees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.name}</td>
                                        <td>{emp.address}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.department}</td>
                                        <td className="d-flex justify-content-evenly" >
                                            <Button variant="outline-secondary" onClick={() => { handleUpdate(emp.id) }}>Update</Button>
                                            <Button variant="outline-danger" onClick={() => {handleDelete(emp.id)}} >Delete</Button>
                                        </td>
                                    </tr>
                                )): <tr className="text-center" ><td colSpan={5} >No Data</td></tr>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;