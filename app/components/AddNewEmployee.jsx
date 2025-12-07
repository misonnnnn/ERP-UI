import { Save, UserPlus } from "lucide-react"

export default function AddNewEmployee(){
    return (
        <>
            <div>
                <h6><UserPlus /> Add new employee</h6>
                <hr />

                <div className="row m-0 mt-3">
                    <div className="col-lg-12">
                        <div>
                            <label htmlFor="">Upload employee photo</label>
                            <input type="file"  className="form-control form-control-sm"/>
                        </div>
                    </div>

                    <div className="col-lg-4 mt-3" >
                        <div>
                            <label htmlFor="">First Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-sm  shadow-none" placeholder="First name" />
                        </div>
                    </div>
                    <div className="col-lg-4 mt-3">
                        <div>
                            <label htmlFor="">Middle Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-sm  shadow-none" placeholder="Middle Name" />
                        </div>
                    </div>
                    <div className="col-lg-4 mt-3">
                        <div>
                            <label htmlFor="">Last Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control form-control-sm  shadow-none" placeholder="Last Name" />
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
                        <button className="btn btn-sm btn-secondary me-2">Cancel</button>
                        <button className="btn btn-sm btn-primary"><Save size={15} strokeWidth={2} /> Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}