import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import Contact from './Contact';

const AllContacts = () => {
   

    const {refetch, data:allData } = useQuery({
      queryKey: ['Data'],
      queryFn: () =>
        fetch('http://localhost:5000/allcontact').then((res) =>
          res.json(),
        ),
    })
    console.log(allData)

    
    return (
      <div className='mt-5 grid lg:grid-cols-4 gap-4 md:grid-cols-2'>
        {
          allData?.map(data=><Contact key={data?._id} refetch={refetch} alldata={data}></Contact>)
        }
    </div>
                );
};

                export default AllContacts;