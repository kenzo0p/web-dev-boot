import { CrosIcon } from "../icons/CrossIcon"
import { Button } from "./Button"


//controlled component
export const CreateContentModal = ({open ,onClose}) => {
    
  return (
    <div>

   {open && <div className="w-screen h-screen  fixed bg-slate-200 top-0 left-0 opacity-60 flex justify-center items-center">
        <div className="flex flex-col justify-center">
            <span className="bg-whte opacity-100 p-4 rounded">
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">

                    <CrosIcon/>
                    </div>
                </div>
                <div>
                    <Input placeholder="Add somthing"/>
                    <Input placeholder="Add somthing"/>
                </div>
                <div className="flex justify-center">

                <Button variant="primary" text="Submit"/>
                </div>
            </span>
        </div>
    </div>}
    </div>
  )
}


function Input({onChange , placeholder} : {onChange : () => void}){
    return (
        <div>
            <input placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-2" onChange={onChange} />
        </div>
    )
}   

