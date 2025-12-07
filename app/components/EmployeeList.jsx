"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import AddNewEmployee from "./AddNewEmployee";
import "../css/modal.css"
import { LoaderCircle, UserPlus } from "lucide-react";
import api from "@/lib/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LoadingContainer from "./LoadingContainer";

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
                            <button className="btn1" onClick={()=>showAddNewEmployeeModal(true)}><UserPlus size={20} /> Add new employee</button>
                        </div>
                        <div className="rounded overflow-hidden mt-2">
                            {
                                employeeList.length ? 
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Status</th>
                                                <th>Date Added</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                employeeList?.map((value, index)=>{
                                                    return (
                                                        <tr>
                                                            <td className="text-capitalize">{value.lastname}, {value.firstname} {value.middlename}</td>
                                                            <td>Web Developer</td>
                                                            <td>Active</td>
                                                            <td>{dayjs(value.created_at).format("YYYY-MM-DD")}</td>
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