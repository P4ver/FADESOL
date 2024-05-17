import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Switch, Paper, Checkbox, IconButton, Typography, Toolbar, TextField,
    TablePagination, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ProductTable = () => {
    // const initialProducts = [
      
    // ];

    // const [products, setProducts] = useState(initialProducts);
    // const [search, setSearch] = useState('');
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [tabValue, setTabValue] = useState(0);
    // const [openEditDialog, setOpenEditDialog] = useState(false);
    // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState(null);

    // const handleSearchChange = (event) => {
    //     setSearch(event.target.value);
    // };

    // const handlePageChange = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleRowsPerPageChange = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    // const handleTabChange = (event, newValue) => {
    //     setTabValue(newValue);
    // };

    // const filteredProducts = products.filter((product) => {
    //     if (tabValue === 1 && !product.published) return false;
    //     if (tabValue === 2 && product.published) return false;
    //     return product.name.toLowerCase().includes(search.toLowerCase());
    // });

    // const handleTogglePublished = (id) => {
    //     setProducts(products.map(product => product.id === id ? { ...product, published: !product.published } : product));
    // };

    // const handleEditClick = (product) => {
    //     setSelectedProduct(product);
    //     setOpenEditDialog(true);
    // };

    // const handleDeleteClick = (product) => {
    //     setSelectedProduct(product);
    //     setOpenDeleteDialog(true);
    // };

    // const handleEditDialogClose = () => {
    //     setOpenEditDialog(false);
    //     setSelectedProduct(null);
    // };

    // const handleDeleteDialogClose = () => {
    //     setOpenDeleteDialog(false);
    //     setSelectedProduct(null);
    // };

    // const handleDeleteProduct = () => {
    //     setProducts(products.filter(product => product.id !== selectedProduct.id));
    //     handleDeleteDialogClose();
    // };

    // const handleEditSave = () => {
    //     // Save changes to the product (this can be extended to include actual editing logic)
    //     handleEditDialogClose();
    // };
    const { productData, loading, error } = useSelector((state) => state.product);
    return (
        <Paper>
                <ul>
                    {productData.map((product) => (
                        <li key={product.id_Produit}>
                            {product.type_Produit}
                        </li>
                    ))}
                </ul>
 
        </Paper>
    );
};

export default ProductTable;