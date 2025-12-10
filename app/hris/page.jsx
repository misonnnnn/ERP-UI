"use client"
import "../css/dashboard.css"
import EmployeeList from "../components/hris/EmployeeList"
import { useContext, useEffect, useState } from "react"
import { BookUser, Boxes, Egg, LogOut } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"
import { redirect } from "next/navigation"
import HeaderContainer from "../components/HeaderContainer"

export default function Employee(){
    const [activeMenu, setActiveMenu ] = useState('employee-list');
    const { user, authLoading, logout  } = useContext(AuthContext);

    return(
        <>
            <HeaderContainer section="HRIS" sectionSubName="HR Information System" />

            <div className="body-container">
                <div className="sideBarMenu mt-2">
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
                    <div className={`sideBarMenuList ${activeMenu == 'department' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('department')}>
                            <Boxes /> Department
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