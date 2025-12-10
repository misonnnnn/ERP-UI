"use client"
import "../css/dashboard.css"
import { useContext, useEffect, useState } from "react"
import { Archive, BookUser, Boxes, Egg, Folders, LogOut, Trash2 } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"
import HeaderContainer from "../components/HeaderContainer"

export default function Dms(){
    const [activeMenu, setActiveMenu ] = useState('documents');
    const { user, authLoading, logout  } = useContext(AuthContext);

    return(
        <>
            <HeaderContainer section="DMS" sectionSubName="Document Management System"  />

            <div className="body-container">
                <div className="sideBarMenu mt-2">
                    <div className={`sideBarMenuList ${activeMenu == 'documents' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('documents')}>
                            <Folders /> Documents
                        </div>
                    </div>
                    <div className={`sideBarMenuList ${activeMenu == 'archive' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('archive')}>
                            <Archive /> Archieve
                        </div>
                    </div>
                    <div className={`sideBarMenuList ${activeMenu == 'bin' ? 'active' : ''}`}>
                        <div onClick={()=> setActiveMenu('bin')}>
                            <Trash2 /> Bin
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