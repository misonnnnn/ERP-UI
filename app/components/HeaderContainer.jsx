import { Egg, FileBox, LogOut } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "../css/header.css"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function HeaderContainer({section, sectionSubName}){
    const { logout } = useContext(AuthContext);
    const pathname = usePathname();
    const firstSegment = pathname.split('/')[1];
    return (
        <div className="header-container">
            <div className="company_header p-2 d-flex justify-content-start align-items-center">
                <Egg size={30}/>
                <div className="ms-2">
                    <h6 className="m-0 p-0"> Work Nest | {section}</h6>
                    <p className="m-0 light_text ">{ sectionSubName }</p>
                </div>
            </div>

            <div className="search-wrapper">
                <div className="d-flex align-items-center main_menu">
                    <Link className="default_link" href="/hris">
                        <div className="p-2">
                            <FileBox />
                            <p className={`m-0 ${firstSegment == 'hris' ? 'main_menu_active' : ''}`}> HRIS</p>
                        </div>
                    </Link>
                    <Link className="default_link" href="/dms">
                        <div className="p-2">
                            <FileBox />
                            <p className={`m-0 ${firstSegment == 'dms' ? 'main_menu_active' : ''}`}>DMS</p>
                        </div>
                    </Link>
                    <Link className="default_link" href="#">
                        <div className="p-2">
                            <FileBox />
                            <p className={`m-0 ${firstSegment == 'user-role' ? 'main_menu_active' : ''}`}>UM</p>
                        </div>
                    </Link>
                    <input type="search" className="dashboard-search-input" placeholder="Search" />
                </div>
            </div>

            <div className="mx-2 signout_button" onClick={logout}>
                <span><LogOut /> Sign out</span>
            </div>
        </div>
    )
}
