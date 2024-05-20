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
// import { deleteUserData, updateUserData } from '../store/userSlice';

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

    const handleDeleteProduct = () => {
        console.log()
        // dispatch(deleteUserData(product.id_Produit))
        // setProducts(productData.filter(product => product.id_Produit !== selectedProduct.id_Produit));
        handleDeleteDialogClose();
    };

    const handleEditSave = () => {
        // Save changes to the product (this can be extended to include actual editing logic)
        handleEditDialogClose();
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
                                <TableRow key={product.id}>
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


