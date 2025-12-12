"use client"
import { ChevronRight, FilePlusCorner, FolderPlus, Slash } from "lucide-react"
import "../../css/dms/documents.css"
import "../../css/modal.css"
import CreateNewFolder from "./CreateNewFolder"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import LoadingContainer from "../LoadingContainer"

export default function Documents(){
    const [ isCreateNewFolderModalActive, setIsCreateNewFolderModalActive ] = useState(false);
    const [ folderList, setFolderList ] = useState([]);
    const [ isFolderListLoading, setIsFolderListLoading ] = useState(true);
    
    const getFolderList = async () =>{
        const res = await api.get("/folder?");
        if(res){
            console.log(res)
            setFolderList(res.data);
            setIsFolderListLoading(false);
        }
    }

    useEffect(() =>{
        getFolderList();
    }, [])

    return (
        <>
            <div className="container" >
                <div className="d-flex justify-content-start mt-2">
                    <button className="documents_button me-2">
                        Upload File 
                        <FilePlusCorner size={17} className="ms-1"/>
                    </button>

                    <button className="documents_button me-2" onClick={() => setIsCreateNewFolderModalActive(true)}>
                        Create New Folder
                        <FolderPlus size={17}  className="ms-1"/>
                    </button>
                </div>
                <hr />
                
                {/* breadcrumbs */}
                
                <div>
                    <p className="m-0"><span className="path-text me-3">Path:</span> Home <ChevronRight size={10} /> test <ChevronRight size={10} /></p>
                </div>

                <div className="position-relative mt-5" >
                    <div className="row ">
                        {
                            isFolderListLoading ? <LoadingContainer /> :
                            
                            folderList.length ? 
                            folderList.map((folder, index) =>{
                                return (
                                    <div className="col-lg-2 col-md-4 col-sm-6 folder-outer">
                                        <div className="folder">
                                            <div className="folder-inside"></div>
                                            <span className="folder-name">{folder.name}</span>
                                        </div>
                                    </div>
                                )
                            })

                            : 

                            <div className="col-lg-12 ">
                                <p className="text-center">No documents to load</p>
                            </div>
                        }
                        
                        
                    </div>
                </div>
            </div>

            {
                isCreateNewFolderModalActive ? 
                <>
                    <div className="modal-background" onClick={ () => setIsCreateNewFolderModalActive(false)}></div>
                    <div className="modal-div">
                        <div className="row m-0 w-100">
                            <div className="col-lg-3 mx-auto ">
                                <div className="modal-div-content">
                                    <div className="modal-div-close" onClick={ () => setIsCreateNewFolderModalActive(false)}> X </div>
                                    {/* <AddNewEmployee /> */}
                                    <CreateNewFolder  
                                        closeModal={() => setIsCreateNewFolderModalActive(false)}
                                        reinitializeFolderList = { () => getFolderList()} 
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