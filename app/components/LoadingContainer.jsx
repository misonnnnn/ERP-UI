import { LoaderCircle } from "lucide-react";


export default function LoadingContainer(){
    return (
        <div className="d-flex justify-content-center p-5 align-items-center">
            <LoaderCircle className="loading_animation me-2" /> Loading ...  
        </div>
    )
}