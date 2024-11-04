import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./UpdateUser.css"

const UpdateUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        department: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]:value,
        })
    }

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                 const response = await fetch("http://localhost:8080/api/employee/"+id);

                 const data = await response.json();

                 setFormData(data);
            }
            catch (err) {
                console.error("error fetching");
            }
        }

        fetchEmployee();

    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.email || !formData.name || !formData.address || !formData.phone || !formData.department) {
                alert("Fill the details.");
                return;
            }
            const response = await fetch('http://localhost:8080/api/employee/'+id, 
            {
                method: "PUT",
               headers: { "content-type": "application/json"},
               body: JSON.stringify(formData),
           });

           const data = await response.json();

           navigate('/');
           
        } catch (err) {
            console.error("error updating...");
            
        }
    }

    return (
        <>
        <div className="center-form">
            <h1>Edit Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Control type="text" name="address" placeholder="Enter address" value={formData.address} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Control type="text" name="phone" placeholder="Enter phone" value={formData.phone} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicDepartment">
                    <Form.Control type="text" name="department" placeholder="Enter department" value={formData.department} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Edit Employee</Button>
            </Form>
        </div>
        </>
    )
}

export default UpdateUser;