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
    const [ folderParentId, setFolderParentId ] = useState(null);
    const [ folderParentName, setFolderParentName ] = useState('root');
    const [ folderPerentIds, setFolderPerentIds ] = useState([{folder_id : null, folder_name : 'root'}]);
    
    const getFolderList = async () =>{

        const params = {}
        if(folderParentId){
            params.folder_parent_id = folderParentId;
        }
        const queryString = new URLSearchParams(params).toString();

        const res = await api.get("/folder?"+queryString);
        if(res){
            console.log(res)
            setFolderList(res.data);
            setIsFolderListLoading(false);
        }
    }

    useEffect(() =>{
        setIsFolderListLoading(true);
        getFolderList();
        if(!folderPerentIds.some(f => f.folder_id === folderParentId)){
            folderPerentIds.push({folder_id: folderParentId, folder_name: folderParentName });
            console.log(folderPerentIds)
        }
    }, [folderParentId])

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
                    <div className="m-0"><span className="path-text me-3 d-flex">Path:</span> 
                        {
                            folderPerentIds.map((folder, key) =>{
                                return (
                                    <span key={key}>
                                        <span>{folder.folder_name} <ChevronRight size={10} /></span>
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="position-relative mt-5" >
                    <div className="row ">
                        {
                            isFolderListLoading ? <LoadingContainer /> :
                            
                            folderList.length ? 
                            folderList.map((folder, index) =>{
                                return (
                                    <div className="col-lg-2 col-md-4 col-sm-6 folder-outer" key={index} onClick={() => (setFolderParentId(folder.id), setFolderParentName(folder.name) )}>
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
                                        folderParentId={folderParentId}
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