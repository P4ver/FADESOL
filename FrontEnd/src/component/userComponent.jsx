import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../store/userSlice';

const UserComponent = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state) => state.user);
    // const [displayEdit, setDislayEdit] = useState(null)

// console.log(userData)

useEffect(() => {
    dispatch(fetchUserData()); // Dispatch the fetchProductData action when the component mounts
}, [dispatch]);


const handlePostChange = (event)=>{
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name]:value
    })
    console.log(event)
  }


// const handleSubmit = async () =>{
//     try {
//     // Dispatch the postProductData action
//     await dispatch(postProductData(formData));
//     // Clear the form input fields
//         setFormData({
//         id_User:"",		
//         pu_Produit:"",		
//         type_Produit:"",		
//         prix_Vente:"",		
//         note_Produit:"",		
//         code_Barre:"",		
//         numero_Serie:"",		
//         unite:"",		
//         statut:""
//     });
//     } catch (error) {
//     // Handle errors, if any
//     console.error("Failed to add product:", error);
//     }
// }

//====================== Mise à jour des produits ================================

const handleUpdateChange = (id_User, event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [id_User]: {
          ...formData[id_User],
          [name]: value
        }
    });
  };


const handleUpdate = (productId) => {
    if (productId && formData[productId]) {
      console.log("=>>>>",formData[productId])
      console.log(productId)
      dispatch(updateProductData({ productId: productId, updatedProductData: formData[productId] }));

    } else {
      console.error('Product ID or edited product data is missing.');
    }
  };
    // const handleEdit = (id_User)=>{
    //     setDislayEdit(id_User)
    // }
    const handleEdit = (product)=>{
        setDislayEdit(product.id_User)
        setFormData(product);
    }
    
//================================================================================


// const handleDelete = (id_User) => {
//         dispatch(deleteProductData(id_User));
// }


return (
    <>        
    <p >Affichage des produits</p>
    <ul>
        {userData.map((user) => (
            <li key={user.id_User}>
                {user.id_User}
            </li>
        ))}
    </ul>

{/* 
    <form  onSubmit={handleSubmit}>
        <div>
        <h3>Ajouter un product</h3>
        <input type="text" placeholder="prix unitaire" name="pu_Produit" value={formData.pu_Produit} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="type" name ="type_Produit" value ={formData.type_Produit} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="prix de vente" name="prix_Vente" value={formData.prix_Vente} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="note de produit" name="note_Produit" value={formData.note_Produit} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="code barre" name="code_Barre" value={formData.code_Barre} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="numero de serie" name="numero_Serie" value={formData.numero_Serie} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="unite" name="unite" value={formData.unite} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="statut" name="statut" value={formData.statut} onChange={(event)=>handlePostChange(event)}/>
        <button type="submit">Ajouter</button>
        </div>
    </form> */}

<ul>
    {productData.map((product) => (
        <li key={product.id_User}>
                        <strong>Prix unitaire:</strong> {product.pu_Produit}, <strong>Type:</strong> {product.type_Produit}, <strong>Prix Vente:</strong> {product.prix_Vente} 
            ,<strong>note_Produit:</strong> {product.note_Produit}, <strong>code_Barre:</strong> {product.code_Barre} , <strong>numero_Serie:</strong> {product.numero_Serie} , <strong>unite:</strong> {product.unite}, , <strong>statut:</strong> {product.statut} 

            {displayEdit === product.id_User ? (
                <>
                    <input type="text" value={formData[user.id_User]?.pu_Produit || ''} name="pu_Produit" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="prix unitaire" />
                    <input type="text" value={formData[user.id_User]?.type_Produit || ''} name="type_Produit" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="type" />
                    <input type="text" value={formData[user.id_User]?.prix_Vente || ''} name="prix_Vente" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="prix de vente" />
                    <input type="text" value={formData[user.id_User]?.note_Produit || ''} name="note_Produit" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="note de produit" />
                    <input type="text" value={formData[user.id_User]?.code_Barre || ''} name="code_Barre" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="code barre" />
                    <input type="text" value={formData[user.id_User]?.numero_Serie || ''} name="numero_Serie" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="numero de serie" />
                    <input type="text" value={formData[user.id_User]?.unite || ''} name="unite" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="unite" />
                    <input type="text" value={formData[user.id_User]?.statut || ''} name="statut" onChange={(event) => handleUpdateChange(user.id_User, event)} placeholder="statut" />
                    <button onClick={() => handleUpdate(user.id_User)}>Update</button>
                    <button onClick={() => setDislayEdit(null)}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button onClick={() => handleDelete(product.id_User)}>Delete</button>
                </>
            )}
        </li>
    ))}
</ul>

    </>
    );
}
 
export default UserComponent;

