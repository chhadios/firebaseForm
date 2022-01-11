import React, { useState, useContext } from 'react';
import { db } from '../firebase/firestore';
import { mycontext } from '../context';

const DetailsMultiple = (props) => {
    const context = useContext(mycontext);
    const [files, setFiles] = useState()
    const [quantity, setquantity] = useState("");
    const [price, setprice] = useState("");
    const [itemName, setitemName] = useState("");
    const [Pricerange, setPricerange] = useState("");
    const [livestreamtime, setlivestreamtime] = useState("");
    const [sharerText, setsharerText] = useState("");
    const [CommissionRate, setCommissionRate] = useState("");
    const [array, setarray] = useState([]);
    let [pp, setpp] = useState([]);
    const [docId, setdocId] = useState('');
    const [Button, setButton] = useState(false);
    

    function handledefault(e) {
        e.preventDefault()
        setButton(true);
        db.collection("liveVideo").add(
            {
                CommissionRate: `${CommissionRate}`,
                sharerText: `${sharerText}`,
                livestreamtime: `${livestreamtime}`,
                Pricerange: `${Pricerange}`,
                sellerId: `${props.match.params.id}`,
                state: `Scheduled`,
                videoLink: ``,
                category: `${props.match.params.catagory}`,
                seller: `${props.match.params.seller}`,
                createdAt: Date().toLocaleString()

            }
        ).then((docRef) => {
            setdocId(docRef.id)
            console.log(`done`)

        }).catch((error) => {
            console.error("Error adding document: ", error);
        })
    }


    function handleSubmit(e, url) {
        e.preventDefault()
        array.unshift({
            imageUrl: `${url}`,
            itemName: `${itemName}`,
            price: `${price}`,
            quantity: `${quantity}`
        })
        pp = array.filter(
            (ele, ind) => ind === array.findIndex(elem => elem.imageUrl === ele.imageUrl))

        console.log(array);
        console.log(pp);

    }


    function handleUpdate(e, url) {
        e.preventDefault()

        console.log(docId)
        var batch = db.batch()
        pp.forEach((doc) => {
            var docRef = db.collection("liveVideo").doc(`${docId}`).collection("products").doc(); //automatically generate unique id
            batch.set(docRef, doc);
        });
        batch.commit().then(function () {
            alert('done')

        })

    }

    return (
        <>
            <div className='form-container'>
                <div className="cart-items">

                    <form className='form'>
                        <label className='form_label'>Commission Rate</label>
                        <input onChange={e => setCommissionRate(e.target.value)} className='form_input' type="text" />
                        <label className='form_label'> sharer Text</label>
                        <input onChange={e => setsharerText(e.target.value)} className='form_input' type="text" />
                        <label className='form_label'>live stream time</label>
                        <input onChange={e => setlivestreamtime(e.target.value)} className='form_input' type="text" />
                        <label className='form_label'>Price range</label>
                        <input onChange={e => setPricerange(e.target.value)} className='form_input' type="text" />
                        <button className='btn-upd' onClick={(e) => handledefault(e)}>update</button>

                    </form>
                </div>
                {context.state.images ?
                    context.state.images.map((item, i) => (
                        <div className="cart-items" key={i}>

                            <img
                                src={item}
                                alt="img"
                                className='image'
                            />
                            <form className='form'>
                                <label className='form_label'>Quantity</label>
                                <input onChange={e => setquantity(e.target.value)} className='form_input' type="text" />
                                <label className='form_label'>item name</label>
                                <input onChange={e => setitemName(e.target.value)} className='form_input' type="text" />
                                <label className='form_label'>price</label>
                                <input onChange={e => setprice(e.target.value)} className='form_input' type="text" />
                                <button className='btn-upd' onClick={(e) => handleSubmit(e, item)}>update</button>
                            
                            </form>
                        </div>
                    ))
                    : null}
                <br />
                {Button ?

                    <button onClick={(e) => handleUpdate(e)}>update all changes</button>
                    : null}
            </div>
        </>
    )
}

export default DetailsMultiple