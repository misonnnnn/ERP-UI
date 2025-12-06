"use client"
import DashboardItem from "../../components/DashboardItem"
import "../../css/dashboard.css"
import EmployeeList from "../../components/EmployeeList"
import { useContext, useEffect, useState } from "react"
import { BookUser, Boxes, Egg, LogOut } from "lucide-react"
import { AuthContext } from "../../../context/AuthContext"
import { redirect } from "next/navigation"

export default function Employee(){
    const [activeMenu, setActiveMenu ] = useState('employee-list');
    const { user, authLoading  } = useContext(AuthContext);
    if(!authLoading && !user){
        redirect('/login')         
    }

    return(
        <>
            <div className="header-container">
                <div className="company_header p-3 d-flex align-items-center">
                    <h6 className="m-0 p-0"><Egg /> Work Nest | HRIS</h6>
                </div>

                <div className="search-wrapper">
                    <input type="search" className="dashboard-search-input" placeholder="Search" />
                </div>

                <div className="mx-2">
                    <span><LogOut /> Sign out</span>
                </div>
            </div>

            <div className="body-container">
                <div className="sideBarMenu">
                    <div className={`sideBarMenuList ${activeMenu == 'employee-list' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('employee-list')}>
                            <BookUser /> Employee List
                        </div>
                    </div>
                    <div className={`sideBarMenuList ${activeMenu == 'employee-position' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('employee-position')}>
                            <Boxes /> Employee Position
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    {
                        activeMenu == 'employee-list' ? <EmployeeList /> : ''
                    }
                </div>
            </div>
        </>
    )
}