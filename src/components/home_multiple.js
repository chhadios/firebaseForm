import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase/firestore';
import { storage } from '../firebase/firebaseStorage';
import '../App.css';
import { mycontext } from '../context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Homemultiple = (props) => {
    const [Seller, setSeller] = useState([]);
    const [files, setFiles] = useState([])
    const [imageurl, setimageurl] = useState([])
    const [loader, setloader] = useState(false)
    const [sellerId, setsellerId] = useState("0")
    const [sellerr, setsellerr] = useState()
    const [catagory, setcatagory] = useState()

    const context = useContext(mycontext);


    useEffect(() => {
        db.collection("Seller")
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, "=>", doc.data());
                        setSeller(prevState => [...prevState, doc.data()]);
                        console.log(Seller)

                    });
                    setsellerId(Seller.sellerId);
                }

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, []);

    const uniqueArray = Seller.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    })


    const handleSelect = (e) => {
        setsellerId(e.target.value)
        db.collection("Seller").where("phone", "==", e.target.value)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setcatagory(doc.data().category);
                    setsellerr(doc.data().businessName)
                    console.log(catagory);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const onFileChange = e => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newFile = e.target.files[i];
            newFile["id"] = Math.random();

            setFiles(prevState => [...prevState, newFile]);
        }
    };

    const onUploadSubmission = e => {
        e.preventDefault();
        setloader(true);
        const promises = [];
        files.forEach(file => {
            const uploadTask =
                storage.ref().child(`images/${sellerId}/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (snapshot.state === storage.TaskState.RUNNING) {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                error => console.log(error.code),
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                    setimageurl(prevState => [...prevState, downloadURL]);

                    console.log(downloadURL)

                }
            );
        });
        Promise.all(promises)
            .then(() => {
                setloader(false);
                alert('done');
            })
            .catch(err => console.log(err.code));
    }

    const onSubmission = () => {


        for (let index = 0; index < imageurl.length; index++) {
            const element = imageurl[index];
            context.state.images.push(element);

        }
        console.log(context.state)
        props.history.push(`/details/${sellerId}/${sellerr}/${catagory}`)

    }
    console.log(sellerId)
    return (
        <>
            <label htmlFor="ProductCategory" className="form-label">Product Category</label>
            <select name="ProductCategory" defaultValue="0" onChange={handleSelect} className="select"  >
                <option value="0">buisness name</option>
                {uniqueArray.map(function (item) {
                    return (
                        <option key={item.phone} value={item.phone} className="categoryValue">{item.businessName}</option>

                    )
                })}
            </select>
            <br />
            {sellerId !="0" && sellerId != undefined ?

            <div>
            <input className="file-input" type="file" multiple onChange={onFileChange} />
            <button className='btn' onClick={onUploadSubmission} > upload images</button>
            {loader ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : null}
            <br />
            <button className='btn' onClick={onSubmission}>Add details</button>
                </div>
                    :null}
                    <button className='btn' onClick={()=>{props.history.push('/seller')}}>move to seller page</button>
        </>
    )
}
export default Homemultiple;