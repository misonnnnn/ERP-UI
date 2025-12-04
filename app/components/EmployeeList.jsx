import Link from "next/link"
import { useState } from "react"
import AddNewEmployee from "./AddNewEmployee";

export default function EmployeeList(){
    const [ addNewEmployeeModal, showAddNewEmployeeModal ] = useState(false);

    return (
        <>
            <div className="w-100 d-flex justify-content-center">
                <div className="row w-100">
                    <div className="col-lg-9 mx-auto">
                        <div className="d-flex justify-content-end mt-5">
                            <button className="btn1" onClick={()=>showAddNewEmployeeModal(true)}>Add new employee</button>
                        </div>
                        <div className="rounded overflow-hidden mt-2">
                            <table class="table table-dark table-striped">
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
                <div className="position-absolute bg-light text-dark">
                    <AddNewEmployee />
                </div>

                : ''
            }
        </>
    )
}