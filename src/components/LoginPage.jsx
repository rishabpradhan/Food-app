import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const initial={email:"",password:""};
    const [query, setQuery] = useState(initial);
    const[error,setError] = useState({});
    const [password, setPassword] = useState(false);
   const navigate=useNavigate();

    const tooglePassword = () => {
        setPassword(true);

    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        e.preventDefault();
        setQuery({
            ...query,
            [name]:value
        });
        setError({
            ...error,
            [name]: null
        })

    };
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response= await axios.post("http://localhost:3000/users/login",query);
            if(response.status === 200){
                localStorage.setItem("token",response.data.token);
               navigate("/dashboard");
            }

        }

        catch(err){
        console.log(err.message);

        }

    };

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen overflow-x-hidden">
                <h1 className="text-3xl font-bold font-sans">Login page</h1>
                <form className="mt-8 bg-gray-200 p-8 rounded-xl shadow-xl w-full max-w-md " onSubmit={handleSubmit}>
                    <div className="space-y-1">

                    <div className="flex  justify-center items-cente mb-2">
                        <span className="mr-2">Enter your email:</span> <br/>
                        <input className="border border-solid border-black rounded-xl w-auto ml-7" type="email" name="email" value={query.email} onChange={handleChange} />

                    </div>
                    <div className="flex justify-center items-center">
                        <span className="mr-3">Enter your password:</span>
                        <input className="border border-solid border-black rounded-xl w-auto" type={password?"text":"password"} name="password" value={query.password} onChange={handleChange} />
                    </div>
                    <div className="flex justify-center items-center">
                     <label htmlFor="passwordtoggle">
                         <input type="checkbox" onClick={tooglePassword}/>
                         <span className="font-medium font-inter">show password</span>
                     </label>

                    </div>



                    <div className="flex justify-center items-center">
                        <button className="border p-2 border-soild border-black rounded-xl mt-2 bg-purple-800 text-white hover:bg-purple-500 font-sans" type="submit">Login</button>

                    </div>
                    </div>
                </form>

            </div>

        </>
    )
}