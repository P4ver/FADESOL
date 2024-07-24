import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData, postProductData, updateProductData } from './actions'; // Assuming these action creators are defined in your actions file
import { Paper, Toolbar, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TextField, Checkbox, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Collapse, Grid, Card, CardContent, Menu, MenuItem } from '@material-ui/core';
import { Edit, Delete, Add, Search } from '@material-ui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from 'qrcode.react';
import { BarcodeCanvas } from 'react-barcode';

const ProductTable = () => {
    const dispatch = useDispatch();
    const { productData, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductData());
    }, [dispatch]);

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tabValue, setTabValue] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [expandedUser, setExpandedUser] = useState(null); 
    const [editedProduct, setEditedProduct] = useState({
        Numéro_Article: "",
        Description_Article: "",
        Groupe_Articles: "",
        Designation_Fadesol: "",
        Emplacement: "",
        qte_Magasin: "",
        Gamme_Etiquette: "",
        Actif: "",
        code_Barre: "",
    });

    const [userValue, setUserValue] = useState(null);
    const [typeUser, setTypeUser] = useState(null);
    const authState = useSelector(state => state.auth);
    const userState = useSelector(state => state.user);

    useEffect(() => {
        if (authState.user) {
            setUserValue(authState.user);
        }
    }, [authState]);

    useEffect(() => {
        if (userValue && userState.userData.length > 0) {
            const match = userState.userData.find(usr => usr.login_User === userValue.username);
            setTypeUser(match.type_User);
        }
    }, [userValue, userState]);

    const checkAccess = () => {
        return typeUser === "Super Admin" || typeUser === "Admin";
    }

    const [formData, setFormData] = useState({
        Numéro_Article: "",
        Description_Article: "",
        Groupe_Articles: "",
        Actif: "",
        Designation_Fadesol:"",
        Gamme_Etiquette:"",
        Emplacement: "",
        qte_Magasin: "",
        code_Barre: "", 
    });

    const [duplicateError, setDuplicateError] = useState(false);

    const handlePostChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const isDuplicate = productData.some(product => product.Numéro_Article === formData.Numéro_Article);
            if (isDuplicate) {
                setDuplicateError(true);
                return;
            }
            await dispatch(postProductData(formData));
            setFormData({
                Numéro_Article: "",
                Description_Article: "",
                Groupe_Articles: "",
                Actif: "",
                Designation_Fadesol:"",
                Gamme_Etiquette:"",
                Emplacement: "",
                qte_Magasin: "",
                code_Barre: "", 
            });
            setOpenAddDialog(false);
            toast.success('Product added successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenEditDialog = (product) => {
        setEditProduct(product);
        setEditedProduct({
            id_Article: product.id_Article,
            Numéro_Article: product.Numéro_Article,
            Description_Article: product.Description_Article,
            Groupe_Articles: product.Groupe_Articles,
            Designation_Fadesol: product.Designation_Fadesol,
            code_Barre: product.code_Barre,
            Emplacement: product.Emplacement,
            qte_Magasin: product.qte_Magasin,
            Gamme_Etiquette: product.Gamme_Etiquette,
            Actif: product.Actif
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setSelectedProduct(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSaveEdit = async () => {
        try {
            await dispatch(updateProductData({ productId: editProduct.id_Article, updatedProductData: editedProduct }));
            setOpenDialog(false);
            dispatch(fetchProductData());
            toast.success('Product updated successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const filteredProducts = productData ? productData.filter((product) => {
        return (
            (product.Numéro_Article && product.Numéro_Article.toLowerCase().includes(search.toLowerCase())) ||
            (product.Description_Article && product.Description_Article.toLowerCase().includes(search.toLowerCase())) ||
            (product.Designation_Fadesol && product.Designation_Fadesol.toLowerCase().includes(search.toLowerCase())) ||
            (product.Groupe_Articles && product.Groupe_Articles.toLowerCase().includes(search.toLowerCase())) ||
            (product.Gamme_Etiquette && product.Gamme_Etiquette.toLowerCase().includes(search.toLowerCase())) ||
            (product.Emplacement && product.Emplacement.toLowerCase().includes(search.toLowerCase()))
        );
    }) : [];

    const [anchorEl, setAnchorEl] = useState(null);
    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setFormData({
            Numéro_Article: "",
            Description_Article: "",
            Groupe_Articles: "",
            Actif: "",
            Designation_Fadesol: "",
            Gamme_Etiquette: "",
            Emplacement: "",
            qte_Magasin: "",
            code_Barre: ""
        });
    };
    return (
        <>
            <Paper>
                <Toolbar>
                    <Typography variant="h6" style={{ flex: '1' }}>Product Table</Typography>
                    <button
                        aria-controls="export-menu"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        className="inline-flex py-2 px-3  text-white font-bold bg-customGreen hover:bg-green-500 focus:bg-green-600 rounded-md ml-4 "
                    >
                        Export
                    </button>
                    <Menu
                        id="export-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={exportToExcel}>Excel</MenuItem>
                        <MenuItem onClick={printData}>Print</MenuItem>
                    </Menu>
                    {checkAccess() && 
                        <button onClick={handleAddClick} className='bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-md mx-1'>
                            Ajouter <Add />
                        </button>
                    }
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
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox color="primary" />
                                </TableCell>
                                <TableCell>Numéro d'article</TableCell>
                                <TableCell>Désignation Fournisseur</TableCell>
                                <TableCell>Groupe d'articles</TableCell>
                                <TableCell>Code Barre</TableCell>
                                <TableCell>Emplacement</TableCell>
                                <TableCell>Qte en stock</TableCell>
                                <TableCell>Statut</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell padding="checkbox">
                                        <Checkbox color="primary" />
                                    </TableCell>
                                    <TableCell>{product.Numéro_Article}</TableCell>
                                    <TableCell>{product.Description_Article}</TableCell>
                                    <TableCell>{product.Groupe_Articles}</TableCell>
                                    <TableCell>{product.code_Barre && product.code_Barre.trim() !== "" && 
                                        <div className="flex flex-col space-y-1">
                                            <BarcodeCanvas value={product.code_Barre} height={30} />
                                            <QRCode value={product.code_Barre} size={50} />
                                        </div>
                                    }</TableCell>
                                    <TableCell>{product.Emplacement}</TableCell>
                                    <TableCell>{product.qte_Magasin}</TableCell>
                                    <TableCell>{product.Actif}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenEditDialog(product)}><Edit /></IconButton>
                                        <IconButton onClick={() => handleDeleteClick(product)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Paper>

            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Ajouter Produit</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="Numéro_Article"
                                label="Numéro d'Article"
                                type="text"
                                fullWidth
                                value={formData.Numéro_Article}
                                onChange={handlePostChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="Description_Article"
                                label="Description d'Article"
                                type="text"
                                fullWidth
                                value={formData.Description_Article}
                                onChange={handlePostChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="Groupe_Articles"
                                label="Groupe d'Articles"
                                type="text"
                                fullWidth
                                value={formData.Groupe_Articles}
                                onChange={handlePostChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="Actif"
                                label="Actif"
                                type="text"
                                fullWidth
                                value={formData.Actif}
                                onChange={handlePostChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="Designation_Fadesol"
                                label="Désignation Fadesol"
                                type="text"
                                fullWidth
                                value={formData.Designation_Fadesol}
                                onChange={handlePostChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="Gamme_Etiquette"
                                label="Gamme Etiquette"
                                type="text"
                                fullWidth
                                value={formData.Gamme_Etiquette}
                                onChange={handlePostChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="Emplacement"
                                label="Emplacement"
                                type="text"
                                fullWidth
                                value={formData.Emplacement}
                                onChange={handlePostChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="qte_Magasin"
                                label="Quantité en Magasin"
                                type="number"
                                fullWidth
                                value={formData.qte_Magasin}
                                onChange={handlePostChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="code_Barre"
                                label="Code Barre"
                                type="text"
                                fullWidth
                                value={formData.code_Barre}
                                onChange={handlePostChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={duplicateError} onClose={() => setDuplicateError(false)}>
                <DialogTitle>Erreur de duplication</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Un produit avec le même "Numéro d'Article" existe déjà.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDuplicateError(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Modifier Produit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Numéro_Article"
                        label="Numéro d'Article"
                        type="text"
                        fullWidth
                        value={editedProduct.Numéro_Article}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="Description_Article"
                        label="Description d'Article"
                        type="text"
                        fullWidth
                        value={editedProduct.Description_Article}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="Groupe_Articles"
                        label="Groupe d'Articles"
                        type="text"
                        fullWidth
                        value={editedProduct.Groupe_Articles}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="Actif"
                        label="Actif"
                        type="text"
                        fullWidth
                        value={editedProduct.Actif}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="Designation_Fadesol"
                        label="Désignation Fadesol"
                        type="text"
                        fullWidth
                        value={editedProduct.Designation_Fadesol}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="Gamme_Etiquette"
                        label="Gamme Etiquette"
                        type="text"
                        fullWidth
                        value={editedProduct.Gamme_Etiquette}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="Emplacement"
                        label="Emplacement"
                        type="text"
                        fullWidth
                        value={editedProduct.Emplacement}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="qte_Magasin"
                        label="Quantité en Magasin"
                        type="number"
                        fullWidth
                        value={editedProduct.qte_Magasin}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="code_Barre"
                        label="Code Barre"
                        type="text"
                        fullWidth
                        value={editedProduct.code_Barre}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirmation de suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer ce produit ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </>
    );
};

export default ProductTable;
