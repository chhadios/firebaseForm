import React,{Component} from 'react'; 
const mycontext =React.createContext();

class Myprovider extends Component{
    
    state={
        images:[],
        sellerId:""
    }
    
    addimagehandler=(img)=>{
        console.log(img)
        this.setState((prevState)=>({
            images:[
                ...prevState.images,
                img
            ]
        }))
        console.log("updated")
    }
   
    addsellerhandler=(seller)=>{
        this.setState({
            sellerId:seller
        }      
        )
    }

    render(){
        return(
            <>
            <mycontext.Provider value={{state: this.state,
            addimage:this.addimagehandler,
            addseller:this.addsellerhandler,
            }}>
                {this.props.children}
            </mycontext.Provider>
            </>
        )
    }
}
export{
    mycontext,
    Myprovider
}