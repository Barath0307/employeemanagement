import Form from "react-bootstrap/Form";
import "./PostUser.css"
import { Alert, AlertHeading, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostUser = () => {

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

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(formData);

        try {
            console.log(formData);
            if (!formData.email || !formData.name || !formData.address || !formData.phone || !formData.department) {
                alert("Fill the details.");
                return;
            }
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("employee created: ", data);
            navigate("/");
        } catch (err) {
            console.log("Error creating employee: ", err.message);
        }
    }
    return (
        <>
        <div className="center-form">
            <h1>Post New Employee</h1>
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

                <Button variant="primary" type="submit" className="w-100">Post Employee</Button>
            </Form>
        </div>
        </>
    )
}

export default PostUser;