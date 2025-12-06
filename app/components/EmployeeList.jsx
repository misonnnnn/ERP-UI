import Link from "next/link"
import { useEffect, useState } from "react"
import AddNewEmployee from "./AddNewEmployee";
import "../css/modal.css"
import { UserPlus } from "lucide-react";


export default function EmployeeList(){
    const [ addNewEmployeeModal, showAddNewEmployeeModal ] = useState(false);

    useEffect(()=>{
        if(addNewEmployeeModal){
            document.body.style.overflow = "hidden";  
        }else{
            document.body.style.overflow = "";  
        }
    }, [addNewEmployeeModal])

    return (
        <>
            <div className="w-100 d-flex justify-content-center">
                <div className="row w-100">
                    <div className="col-lg-9 mx-auto">
                        <div className="d-flex justify-content-end mt-5">
                            <button className="btn1" onClick={()=>showAddNewEmployeeModal(true)}><UserPlus size={20} /> Add new employee</button>
                        </div>
                        <div className="rounded overflow-hidden mt-2">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Status</th>
                                        <th>Date Hired</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John</td>
                                        <td>Web Developer</td>
                                        <td>Active</td>
                                        <td>Jan. 03, 2001</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                addNewEmployeeModal ? 
                <>
                    <div className="modal-background" onClick={ () => showAddNewEmployeeModal(false)}></div>
                    <div className="modal-div">
                        <div className="row m-0 w-100">
                            <div className="col-lg-8 mx-auto ">
                                <div className="modal-div-content">
                                    <div className="modal-div-close" onClick={ () => showAddNewEmployeeModal(false)}> X </div>
                                    <AddNewEmployee />
                                </div>
                            </div>
                        </div>
                    </div>
                </>

                : ''
            }
        </>
    )
}