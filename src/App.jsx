import { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Table } from 'reactstrap'
import ViewDepartment from './ViewDepartment';

function App() {

  const [depts, setDepts] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdToView, setSelectedIdToView] = useState(null);


  const toggle = () => setIsOpen(!isOpen);

  const getDepartments = async () => {
    try {

      const response = await fetch("http://localhost:5134/api/Department");
      const data = await response.json();
      setDepts(data)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {

    getDepartments();

  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        name: deptName
      }

      const response = await fetch(
        "http://localhost:5134/api/Department" ,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }); 
        setDeptName("");
        getDepartments();
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  return (
    <>
      {
        selectedIdToView && <ViewDepartment isOpen={isOpen} toggle={toggle} deptId={selectedIdToView}/>
      }      
      <Form onSubmit={submitHandler}>
        <Input
          name='Name'
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        />

        <Button type='submit' >Submit</Button>

      </Form>

      <Col style={{ margin: 20 }}>
        <Table bordered >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {
              depts.map(dept => (
                <tr key={dept.id}>
                  <td>{dept.id}</td>
                  <td>{dept.name}</td>
                  <td>
                    <Button >Delete</Button>
                    <Button onClick={()=>{
                      toggle();
                      setSelectedIdToView(dept.id);
                    }} >
                      View Data
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </Table>
      </Col>

    </>
  )
}

export default App
