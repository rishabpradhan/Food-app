import {useState, useTransition} from "react";
//import axios from "axios";

export default function FormData() {
const intial={name:"",password:"",email:"",contact:""}; // state for  every input field
const [query, setQuery] = useState(intial); // this hook capture the event in input field by the user
const [ispending, startTransition]=useTransition(); // it will proritize the topmost work and is pending is UI interactive so user can see if form is being submmited
const [error,setError]=useState({}); // managing the error and setting them
//const [messgae, setMessgae] = useState(null); // provide message  if data has been sent to the backend
const [ispassword,setPassword]=useState(false); // generally used for password toogle to password to text
const [submit,setSubmit]=useState(false); // for button to disable once user has submmited

//this changes or handles each and every event of the user
    const handleChange = (e) => {
        const {name, value} = e.target;
        e.preventDefault();
        setQuery({
            ...query,
            [name]:value
        });

        setError({  // all newError are store in error state and remains untill user resolve or refreshes
            ...error,
            [name]:null
        });
       // console.log(query);
    }
   const tooglePassword = () => {
        setPassword(!ispassword); // toogle password to text once user clicked show password
   }
   // user validation part
    const validate=()=>{
        const newError={} // error objects that store all the errors occured from start to end

            if(!query.name.trim()) {
                newError.name="Name is required";
            }
            else if(!/^[a-zA-Z\s\-']{1,50}$/.test(query.name)){
                newError.name="Invalid name";
            }
            if(!query.password.trim()){
                newError.password="Password is required";
            }else if(query.password.length<8){
                newError.password="Password must be at least 8 characters";
            }
            if(!query.email.trim()){
                newError.email="Email is required";
            } else if(!/\S+@\S+\.\S+/.test(query.email)){
                newError.email="Invalid email";
            }
            if (!query.contact.trim()){
                newError.contact="Contact is required";
            }
            else if(query.contact.length < 5 || query.contact.length > 5 ){
                newError.contact="contact length must be 5  numbers ";
            }
            else if(/^\+?[0-9]{1,3}[-.\s]?[0-9]{3}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}$/.test(query.contact)){
                newError.name="Invalid contact number";
            }
            setError(newError); // set all erros at once
            return Object.keys(newError).length === 0; // Return true if no errors
    }
    // form submmissin part
    const handleSubmit=(e)=>{
        e.preventDefault();
        setSubmit(true);
        startTransition(async ()=>{
           try{
               if(!validate()) return; //if validation fails return donot execute the next
               setError({})
               //actual form form submission to the backend
              // const response = await axios.post("http://localhost:3000",query);
              //  if (response.status === 200){
              //      setMessgae(response.data.message);
              //
              //  }
              //  else{
              //      setMessgae(response.data.message);
              //  }

               await new Promise((resolve) => setTimeout(resolve, 2));
               setQuery(intial);
              console.log("submmited",query);


           }
           catch(error){

               console.log(error.message);

           }
           finally{
               setSubmit(false);
           }
        });

    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="flex flex-col w-44 gap-2">
                        <div>
                            <input className=" border border-solid border-black" type="text" name="name" placeholder="Enter your name" value={query.name} onChange={handleChange} disabled={ispending}/>
                            {error.name && <span style={{color:"red"}}>{error.name}</span>}
                        </div>

                        <div>
                            <input className=" border border-solid border-black" type={ispassword ?"text":"password"} name="password" placeholder="Enter your password " value={query.password} onChange={handleChange} disabled={ispending}/>
                            {error.password && <span style={{color:"red"}}>{error.password}</span>}
                        </div>

                        <div>
                            <input className=" border border-solid border-black" type="email" name="email" placeholder="Enter your email" value={query.email} onChange={handleChange} disabled={ispending}/>
                            {error.email && <span style={{color:"red"}}>{error.email}</span>}
                        </div>

                        <div>
                            <input className=" border border-solid border-black" type="text" name="contact" placeholder="Enter your contact" value={query.contact} onChange={handleChange} disabled={ispending}/>
                            {error.contact&&<span style={{color:"red"}}>{error.contact}</span>}
                        </div>



                    </div>
                    <div>
                        <label htmlFor="toggle">

                            <input type="checkbox" onClick={tooglePassword} />
                            <span>show password</span>
                        </label>
                    </div>
                    <div className="">
                        <button className="border  py-1 px-2 rounded-full bg-gray-700 text-white " type="submit" disabled={submit}>{submit?"processing...":"submit"}</button>
                    </div>
                </form>
            </div>

        </>
    );
}