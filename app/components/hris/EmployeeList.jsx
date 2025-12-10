"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import AddNewEmployee from "./AddNewEmployee";
import "../../css/modal.css"
import { EyeIcon, LoaderCircle, SquarePen, UserPlus, UserRound } from "lucide-react";
import api from "@/lib/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LoadingContainer from "./../LoadingContainer";
import "../../css/hris/employee-list.css"

export default function EmployeeList(){
    dayjs.extend(relativeTime);
    const [ addNewEmployeeModal, showAddNewEmployeeModal ] = useState(false);
    const [ employeeList, setEmployeeList ] = useState([]);

    useEffect(()=>{
        if(addNewEmployeeModal){
            document.body.style.overflow = "hidden";  
        }else{
            document.body.style.overflow = "";  
        }
    }, [addNewEmployeeModal])

    const getEmployeeList = async ()=>{
        try{
            const res = await api.get("/employees");
            setEmployeeList(res.data);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getEmployeeList();
    }, [])

    return (
        <>
            <div className="w-100 d-flex justify-content-center">
                <div className="row w-100">
                    <div className="col-lg-9 mx-auto">
                        <div className="d-flex justify-content-end mt-5">
                            <div>
                                <input type="search" class="employee-list-table-search" placeholder="Search ..." />
                            </div>
                            <button className="ms-2 btn1" onClick={()=>showAddNewEmployeeModal(true)}><UserPlus size={20} /> Add new employee</button>
                        </div>
                        <div className="rounded overflow-hidden mt-2">
                            {
                                employeeList.length ? 
                                    <table className="employee-list-table ">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Status</th>
                                                <th>Date Added</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                employeeList?.map((value, index)=>{
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <div className="employee-list-image d-flex justify-content-center align-items-center">
                                                                    <UserRound />
                                                                </div>
                                                            </td>
                                                            <td><span className="text-uppercase fw-bold">{value.lastname}, {value.firstname} {value.middlename}</span></td>
                                                            <td><span className="text-info">Web Developer</span></td>
                                                            <td><span className="text-success fw-bold">Active</span></td>
                                                            <td>{dayjs(value.created_at).format("MMM, DD. YYYY")}</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <button className="employee-list-table-button me-2">
                                                                        <EyeIcon size={15} />
                                                                    </button>
                                                                    <button className="employee-list-table-button">
                                                                        <SquarePen size={15} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                :
                                    <LoadingContainer />
                            }

                            
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
                                    {/* <AddNewEmployee /> */}
                                    <AddNewEmployee 
                                        closeModal={() => showAddNewEmployeeModal(false)}
                                        reInitializeEmployeeList = { () => getEmployeeList()} 
                                    />
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