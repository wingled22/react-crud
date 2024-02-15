import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ViewDepartment = ({isOpen, toggle , deptId}) => {
    const [id, setId] = useState(deptId);
    const [dept, setDept] = useState(null);

    const getDepartments = async () => {
        try {
    
          const response = await fetch("http://localhost:5134/api/Department/"+deptId);
          const data = await response.json();
          setDept(data)
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

    useEffect(()=>{
        getDepartments();
    },[deptId]);

    return ( 
        <Modal centered isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Modal title
            </ModalHeader>
            <ModalBody>
                
                {
                    dept != null ? (
                        <h1>{dept.name}</h1>
                    ) : "No Data"
                }
            </ModalBody>
        </Modal>
    );
}
 
export default ViewDepartment;