import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, postUserData} from '../../store/userSlice';


const AddUser = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state) => state.user);

const [ formData, setFormData ] = useState({
    login_User:"",
    password_User:"",
    nom_User:"",
    prenom_User:"",
    tel_User:"",
    note_User:"",
    type_User:""
})

useEffect(() => {
    dispatch(fetchUserData()); // Dispatch the fetchuserData action when the component mounts
}, [dispatch]);


const handlePostChange = (event)=>{
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name]:value
    })
    console.log(event)
}

const handleSubmit = async () =>{
    try {
    // Dispatch the postUserData action
    await dispatch(postUserData(formData));
    // Clear the form input fields
        setFormData({
        id_User:"",		
        login_User:"",
        password_User:"",
        nom_User:"",
        prenom_User:"",
        tel_User:"",
        note_User:"",
        type_User:""
    });
    } catch (error) {
    // Handle errors, if any
    console.error("Failed to add product:", error);
    }
}

const handleDelete = (id_User) => {
    dispatch(deleteUserData(id_User));
}

return (
    <> 
    <form  onSubmit={handleSubmit}>
        <div>
        <h3>Ajouter un utilisateur</h3>
        <input type="text" placeholder="Login user" name="login_User" value={formData.login_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Password" name ="password_User" value ={formData.password_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Nom" name="nom_User" value={formData.nom_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Prenom" name="prenom_User" value={formData.prenom_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Tel" name="tel_User" value={formData.tel_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Note" name="note_User" value={formData.note_User} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="Type" name="type_User" value={formData.type_User} onChange={(event)=>handlePostChange(event)}/>
        <button type="submit">Ajouter</button>
        </div>
    </form>
    </>
    );
}
 
export default AddUser;

