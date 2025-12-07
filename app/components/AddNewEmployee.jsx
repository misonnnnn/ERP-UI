import { Save, UserPlus } from "lucide-react"
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

export default function AddNewEmployee({ closeModal, reInitializeEmployeeList }){
    const [photo, setPhoto] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [positionId, setPositionId] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        // basic validation
        if (!firstName || !middleName|| !lastName || !email ) {
            toast.error("Please fill in all required fields.")
            return;
        }

        setLoading(true);

        try {
        const formData = new FormData();

        if (photo) formData.append("photo", photo);
            formData.append("firstname", firstName);
            formData.append("middlename", middleName);
            formData.append("lastname", lastName);
            formData.append("position_id", positionId);
            formData.append("email", email);

            const res = await api.post("/employees", formData);

            if(res.data){
                if(res.data.id){
                    toast.success("Employee added successfully")
                    closeModal()
                    reInitializeEmployeeList()
                    setPhoto(null);
                    setFirstName("");
                    setMiddleName("");
                    setLastName("");
                    setPositionId("");
                    setEmail("");
                } 
            
            }else{
                toast.error("Failed to create employee.")
            }

        } catch (err) {
            const message = err?.response?.data?.message;
            if (message) {
                toast.error(message);
            } else {
                toast.error("Failed to create employee.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h6><UserPlus /> Add new employee</h6>
                    <hr />
                    <div className="row m-0 mt-3">
                        <div className="col-lg-6">
                            <div>
                                <label htmlFor="">Upload employee photo</label>
                                <input 
                                    type="file"  
                                    className="form-control form-control-sm"
                                    onChange={(e)=>setPhoto(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6" >
                            <div>
                                <label htmlFor="">Email <span className="text-danger">*</span></label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-sm  shadow-none" 
                                    placeholder="Email" 
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 mt-3" >
                            <div>
                                <label htmlFor="">First Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm  shadow-none" 
                                    placeholder="First name" 
                                    onChange={(e)=>setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 mt-3">
                            <div>
                                <label htmlFor="">Middle Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm  shadow-none" 
                                    placeholder="Middle Name" 
                                    onChange={(e)=>setMiddleName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 mt-3">
                            <div>
                                <label htmlFor="">Last Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm  shadow-none" 
                                    placeholder="Last Name" 
                                    onChange={(e)=>setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 mt-3">
                            <div>
                                <label htmlFor="">Position<span className="text-danger">*</span></label>
                                <select name="" id="" className="form-control form-control-sm shadow-none"  defaultValue=""> 
                                    <option value=""  disabled>Select Position</option>
                                </select>
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