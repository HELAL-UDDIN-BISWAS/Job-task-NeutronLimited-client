
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import axios from "axios";
const AddContacts = () => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure()
    const handleAddCamp = async (data) => {
        const imageFile = new FormData();
        imageFile.append('image', data.photo[0]);
        const { data: imagedata } = await axios.post('https://api.imgbb.com/1/upload?key=b425eed4264500ee966fabfc8c973be7', imageFile);

        const userInfo = {
            campName: data.campname,
            price: data.campfees,
            image: imagedata.data?.display_url,
            venueLocation: data.venue,
            specializedServices: data.services,
            healthcare: data.healthcare,
            targetAudience: data.audience,
            longDescription: data.description
        }
        console.log(userInfo)
        axiosSecure.post('/addcamp', userInfo)
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
            Add Contacts
        </div>
    );
};

export default AddContacts;