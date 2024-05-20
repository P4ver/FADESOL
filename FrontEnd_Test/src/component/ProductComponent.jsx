import React, { useState } from 'react';
import { useEffect } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Switch, Paper, Checkbox, IconButton, Typography, Toolbar, TextField,
    TablePagination, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';

import { fetchProductData } from '../store/productSlice';
import { deleteProductData, updateProductData } from '../store/productSlice';

const ProductTable = () => {
    const dispatch = useDispatch();
        const { productData, loading, error } = useSelector((state) => state.product);


    useEffect(() => {
        dispatch(fetchProductData()); // Dispatch the fetchProductData action when the component mounts
        }, [dispatch]);
    // const initialProducts = [
      
    // ];
    // console.log(productData)
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tabValue, setTabValue] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const [editProduct, setEditProduct] = useState({
        id_Produit:"",
        pu_Produit:"",
        type_Produit:"",
        prix_Vente:"",
        note_Produit:"",
        code_Barre:"",
        numero_Serie:"",
        unite:"", 
        statut:""
    });

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // const filteredProducts = products.filter((product) => {
    //     if (tabValue === 1 && !product.published) return false;
    //     if (tabValue === 2 && product.published) return false;
    //     return product.name.toLowerCase().includes(search.toLowerCase());
    // });

    const handleTogglePublished = (id) => {
        setProducts(products.map(product => product.id === id ? { ...product, published: !product.published } : product));
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditProduct({
            id_Produit:product.id_Produit,
            pu_Produit:product.pu_Produit,
            type_Produit:product.type_Produit,
            prix_Vente:product.prix_Vente,
            note_Produit:product.note_Produit,
            code_Barre:product.code_Barre,
            numero_Serie:product.numero_Serie,
            unite:product.unite, 
            statut:product.statut
        });
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenDeleteDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setSelectedProduct(null);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setSelectedProduct(null);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const handleEditSave = async() => {
        try {
            await dispatch(updateProductData({ id_Produit: editProduct.id_Produit, updateProductData: editProduct }));
            setOpenDialog(false);
            dispatch(fetchProductData());
            toast.success('User updated successfully');
          } catch (error) {
            console.error("Error updating user:", error);
            toast.error(error.message.toString() || "Failed to update user details. Please try again.");
          }
    };
    // const handleEditSave = () => {
    //     if (editProduct) {
    //         dispatch(updateProductData(editProduct));
    //     }
    //     handleEditDialogClose();
    // };
    console.log("-----",selectedProduct)

    const handleDeleteProduct = () => {
        if (selectedProduct) {
            dispatch(deleteProductData(selectedProduct.id_Produit));
        }
        handleDeleteDialogClose();
    };
    return (
        <>   
            {/*
            <ul>
                {productData.map((product) => (
                    <li key={product.id_Produit}>
                        {product.type_Produit}
                    </li>
                ))}
            </ul>
            */}
            <Paper>
                <Toolbar>
                    <Typography variant="h6" style={{ flex: '1' }}>Product Table</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        value={search}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: <Search />
                        }}
                    />
                </Toolbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox color="primary" />
                                </TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Stocks</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Available In</TableCell>
                                <TableCell>Published</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                <TableRow key={product.id_Produit}>
                                    <TableCell padding="checkbox">
                                        <Checkbox color="primary" />
                                    </TableCell>
                                    <TableCell>{product.note_Produit}</TableCell>
                                    <TableCell>{product.type_Produit}</TableCell>
                                    <TableCell>
                                        <Switch checked={product.stock} />
                                    </TableCell>
                                    <TableCell>{product.pu_Produit}</TableCell>
                                    <TableCell>${product.prix_Vente}</TableCell>
                                    <TableCell>
                                        {product.statut}
                                        {product.online && <span>Online</span>}
                                    </TableCell>
                                    <TableCell>
                                        <Switch checked={product.published} onChange={() => handleTogglePublished(product.id)} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleEditClick(product)}><Edit /></IconButton>
                                        <IconButton color="secondary" onClick={() => handleDeleteClick(product)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="note_Produit"
                            label="Note"
                            type="text"
                            fullWidth
                            value={editProduct.note_Produit || ''}
                            onChange={handleEditInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="type_Produit"
                            label="Type"
                            type="text"
                            fullWidth
                            value={editProduct.type_Produit || ''}
                            onChange={handleEditInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="pu_Produit"
                            label="SKU"
                            type="text"
                            fullWidth
                            value={editProduct.pu_Produit || ''}
                            onChange={handleEditInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="prix_Vente"
                            label="Price"
                            type="number"
                            fullWidth
                            value={editProduct.prix_Vente || ''}
                            onChange={handleEditInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="statut"
                            label="Status"
                            type="text"
                            fullWidth
                            value={editProduct.statut || ''}
                            onChange={handleEditInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleEditSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Delete Dialog */}
                <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteProduct} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>

        </>

    );
};

export default ProductTable;


