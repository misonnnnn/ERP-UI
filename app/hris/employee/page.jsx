"use client"
import DashboardItem from "../../components/DashboardItem"
import "../../css/dashboard.css"
import EmployeeList from "../../components/EmployeeList"
import { useState } from "react"

export default function Employee(){
    const [activeMenu, setActiveMenu ] = useState('employee-list');

    return(
        <>
            <div className="header-container">
                <div className="company_header p-3">
                    <h6 className="m-0">Work Nest | HRIS</h6>
                </div>

                <div className="search-wrapper">
                    <input type="search" className="dashboard-search-input" placeholder="Search" />
                </div>

                <div className="mx-2">
                    <span>Sign out</span>
                </div>
            </div>

            <div className="body-container">
                <div className="sideBarMenu">
                    <div className={`sideBarMenuList ${activeMenu == 'employee-list' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('employee-list')}>
                            Employee List
                        </div>
                    </div>
                    <div className={`sideBarMenuList ${activeMenu == 'employee-position' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('employee-position')}>
                            Employee Position
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