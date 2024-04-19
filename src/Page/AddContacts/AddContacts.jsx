
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import axios from "axios";
const AddContacts = () => {
    const { register, handleSubmit } = useForm();
     const onSubmit = async (data) => {
        const imageFile = new FormData();
        imageFile.append('image', data.photo[0]);
        const { data: imagedata } = await axios.post('https://api.imgbb.com/1/upload?key=b425eed4264500ee966fabfc8c973be7', imageFile);

        const userInfo = {
            name: data.name,
            email: data.email,
            number: data.number, 
            address: data.address, 
            image: imagedata.data?.display_url,
          
        }
        console.log(userInfo)
        axios.post('http://localhost:5000/addcontact', userInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Success Register",
                        text: "Thanks For Register",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                console.error(error)
            });
    }
    return (
   <div>
    <div className=' w-full h-[80vh] flex justify-center items-center mx-auto '>
        <div className='bg-white px-14 rounded py-10 drop-shadow-md hover:drop-shadow-xl'>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <div className=''>
                    <div className="w-full">
                        <label className='block'>
                            <span>Name</span>
                        </label>
                        <input type="text" {...register('name')} className="md:w-72 bg-white px-4 py-2 text-lg outline-none border-2 rounded hover:border-gray-600 border-gray-400 duration-200 bg-inherit" placeholder='Inter Your Name' required />
                    </div>
                    <div className="w-full">
                        <label className='block'>
                            <span>Email</span>
                        </label>
                        <input type="email" {...register('email')} className="md:w-72 bg-white px-4 py-2 text-lg outline-none border-2 rounded hover:border-gray-600 border-gray-400 duration-200 bg-inherit" placeholder='Inter Your Email' required />
                    </div>

                    <div className="w-full">
                        <label className='block'>
                            <span>Phone Number</span>
                        </label>
                        <input type="text" {...register('number')} className="md:w-72 bg-white px-4 py-2 text-lg outline-none border-2 rounded hover:border-gray-600 border-gray-400 duration-200 bg-inherit" placeholder='Inter Your Number' required />
                    </div>
                    <div className="w-full">
                        <label className='block'>
                            <span>Address</span>
                        </label>
                        <input type="text" {...register('address')} className="md:w-72 bg-white px-4 py-2 text-lg outline-none border-2 rounded hover:border-gray-600 border-gray-400 duration-200 bg-inherit" placeholder='Inter Your Adderess' required />
                    </div>
                    <div className="w-full">
                        <label className='block'>
                            <span>Photo</span>
                        </label>
                        <input type="file"  {...register("photo")} className="" required />
                    </div>
                </div>
                <button className="py-3 bg-primary-500 hover:bg-primary-600 text-white px-5 rounded my-2 w-full">Contacts</button>
            </form>
           
        </div>
    </div>
   </div>

    );
};

export default AddContacts;