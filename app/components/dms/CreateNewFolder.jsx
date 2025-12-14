import { FolderPlus, Save, UserPlus } from "lucide-react"
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

export default function CreateNewFolder({ closeModal, reinitializeFolderList, folderParentId }){
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        // basic validation
        if (!name) {
            toast.error("Please fill in all required fields.")
            return;
        }

        setLoading(true);

        try {
        const formData =    new FormData();
            formData.append("name", name);

            if(folderParentId){
                formData.append("parent_id", folderParentId);
            }

            const res = await api.post("/folder", formData);

            if(res.data.success){
                toast.success(res.data.message)
                closeModal()
                setName("");
                reinitializeFolderList();
            
            }else{
                toast.error(res.data.message)
            }

        } catch (err) {
            const message = err?.response?.data?.message;
            if (message) {
                toast.error(message);
            } else {
                toast.error("Failed to create folder.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h6><FolderPlus /> Create new Folder</h6>
                    <hr />
                    <div className="row m-0 mt-3">
                        <div className="col-lg-12 mt-3" >
                            <div>
                                <label htmlFor="">Folder name <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm  shadow-none" 
                                    placeholder="Folder name" 
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-end">
                        <div className="d-flex">
                            <div className="btn btn-sm btn-secondary me-2" onClick={()=> closeModal()}>Cancel</div>
                            <button className="btn btn-sm btn-primary"><Save size={15} strokeWidth={2} /> {loading ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}