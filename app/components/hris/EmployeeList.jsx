"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import AddNewEmployee from "./AddNewEmployee";
import "../../css/modal.css"
import { ChevronsLeft, ChevronsRight, EyeIcon, LoaderCircle, SquarePen, UserPlus, UserRound } from "lucide-react";
import api from "@/lib/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LoadingContainer from "./../LoadingContainer";
import "../../css/hris/employee-list.css"

export default function EmployeeList(){
    dayjs.extend(relativeTime);
    const [ addNewEmployeeModal, showAddNewEmployeeModal ] = useState(false);
    const [ employeeList, setEmployeeList ] = useState([]);
    const [ search, setSearch] = useState("");
    const [ page, setPage] = useState(1);
    const [ perPage, setPerPage] = useState(10);
    const [ isEmployeeListLoading, setIsEmployeeListLoading ] = useState(true);
    const [ paginationData, setPaginationData ] = useState(null);

    useEffect(()=>{
        if(addNewEmployeeModal){
            document.body.style.overflow = "hidden";  
        }else{
            document.body.style.overflow = "";  
        }
    }, [addNewEmployeeModal])

    const getEmployeeList = async (searchkeyword=null, per_page=10, page=1)=>{
        try{
            const params = {
                page,
                per_page
            };

            if(searchkeyword){
                params.search = searchkeyword;
            }

            const queryString = new URLSearchParams(params).toString();
            const res = await api.get("/employees?"+queryString);
            console.log(res.data)

            //removing first and last url from links
           

            setEmployeeList(res.data.data);
            setPaginationData({
                links : res.data.links,
                prev_page_url: res.data.prev_page_url,
                next_page_url: res.data.next_page_url,
            });
            setIsEmployeeListLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getEmployeeList();
    }, [])

    useEffect(() => {
        setIsEmployeeListLoading(true)
        const timeout = setTimeout(() => {
            getEmployeeList(search, perPage, page);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, page]);

    const handleSetPage = (pageToSet) =>{
        if(pageToSet != null && pageToSet !== page){
            setPage(pageToSet);
        }
    }

    return (
        <>
            <div className="w-100 d-flex justify-content-center">
                <div className="row w-100">
                    <div className="col-lg-9 mx-auto">
                        <div className="d-flex justify-content-end mt-5">
                            <div>
                                <input type="search" className="employee-list-table-search" onChange={ (e) => (setSearch(e.target.value) , setPage(1))} placeholder="Search ..." />
                            </div>
                            <button className="ms-2 btn1" onClick={()=>showAddNewEmployeeModal(true)}><UserPlus size={20} /> Add new employee</button>
                        </div>
                        <div className=" overflow-hidden mt-2">
                            {
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
                                        isEmployeeListLoading ? 
                                            <tr>
                                                <td colSpan={6}><LoadingContainer /></td>
                                            </tr>
                                        : 
                                            employeeList.length > 0 ? 
                                            employeeList.map((value, index)=>{
                                            return (
                                                <tr key={index}>
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

                                        :

                                        <tr>
                                            <td colSpan={6}><p className="text-center m-0">No data.</p></td>
                                        </tr>
                                    }       

                                    
                                </tbody>
                            </table>
                                
                            }

                            {/* pagination */}
                            {
                                paginationData?.links ? 
                                <div>
                                    <nav className="mt-2 d-flex justify-content-end">
                                        <ul className="pagination ">

                                            {
                                                paginationData?.links?.map((i, key)=>{
                                                    return (
                                                        <li className="page-item" key={key}>
                                                            <div className={`page-link ${i.active ? ' active' : ''}`} onClick={() => handleSetPage(i.page)}>
                                                                {i.label === "&laquo; Previous" ? (
                                                                    <ChevronsLeft size={13} />
                                                                ) : i.label === "Next &raquo;" ? (
                                                                    <ChevronsRight size={13} />
                                                                ) : (
                                                                    i.label
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </nav>
                                </div>

                                : ''
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