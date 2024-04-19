import { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"
import axios from "axios";
import { Button, Modal, Typography } from 'keep-react'

const Contact = ({ alldata, refetch }) => {

  console.log(alldata)
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const { register, handleSubmit } = useForm();


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const deleteData = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/deletecontact/${id}`, {
            method: "DELETE",
          })
            .then(data => {
              refetch();
              if (data.deletedCount > 0) {
                refetch()
                Swal.fire({
                  title: 'success',
                  text: 'Do you want to continue',
                  icon: 'success',
                  confirmButtonText: 'DELETE'
                })
              }
              setIsOpen(false);
            })
            .caches(error => console.log(error))
        }
      });
  }
 
// -==-=-=-=-
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
  axios.put(`http://localhost:5000/updatecontact/${alldata?._id}`, userInfo)
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
    setIsUpdate(false)
}

  // -=-=-=-=-=-=--
  const openModal = () => {
    setIsUpdate(true)
  }
  const closeModal = () => {
    setIsUpdate(false)
  }

  
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg">
      <img className="w-full  h-[200px]" src={alldata?.image} alt="Person" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{alldata?.name}</div>
        <p className="text-gray-700 text-base">
          Email: johndoe@example.com <br></br>
          Phone: +1234567890 <br></br>
          Address: 123 Main St, City, Country
        </p>
      </div>
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:bg-gray-300"
          onClick={toggleDropdown}
        >
          Action
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md">
            <ul>
              <li onClick={openModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >
                Update
              </li>
              <li onClick={() => deleteData(alldata?._id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Delete
              </li>
            </ul>
            <Modal isOpen={isUpdate} onClose={closeModal}>
        <Modal.Body className="space-y-3">      
          <Modal.Content>
            <Typography variant="div" className="!mb-6">           
              <Typography variant="p" className="text-body-4 font-normal text-metal-600">
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
              </Typography>
            </Typography>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeModal} size="sm" variant="outline" color="secondary">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;