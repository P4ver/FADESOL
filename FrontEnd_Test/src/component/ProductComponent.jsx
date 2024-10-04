import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { IoQrCode } from "react-icons/io5";
import { FaBarcode } from "react-icons/fa";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Switch, Paper, Checkbox, IconButton, Typography, Toolbar, TextField,
    TablePagination, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { GrView } from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData } from '../store/productSlice';
import { deleteProductData, updateProductData, postProductData, duplicateProductData } from '../store/productSlice';
import {postTransactionData} from '../store/transactionSlice'
import JsBarcode from 'jsbarcode';
import { Collapse, Card, CardContent, Menu, MenuItem } from "@material-ui/core";
import Barcode from 'react-barcode';
import { QRCode } from 'react-qrcode-logo';
import * as XLSX from 'xlsx'
import { Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { IoDuplicateOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const BarcodeCanvas = ({ value, id }) => {
    const ref = useRef(null);

    useEffect(() => {
        const convertSvgToCanvas = () => {
            const svg = ref.current.querySelector('svg');
            if (svg) {
                const canvas = document.createElement('canvas');
                canvas.width = svg.clientWidth;
                canvas.height = svg.clientHeight;
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    canvas.id = id; // Set the ID for the canvas
                    ref.current.replaceChild(canvas, svg);
                };
                img.src = `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svg))}`;
            }
        };

        convertSvgToCanvas();
    }, [value, id]);

    return (
        <div ref={ref}>
            <Barcode value={value} />
        </div>
    );
};


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

    // const [editedProduct, setEditedProduct] = useState({
    //     Numéro_Article: "",
    //     Description_Article: "",
    //     Groupe_Articles: "",
    //     Designation_Fadesol: "",
    //     code_Barre: "",
    // });
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
    //   ==============================================================
    const [ userValue, setUserValue] = useState(null);
    const [typeUser, setTypeUser] = useState(null);
    const [loginUserName, setLoginUserName] = useState(null);
    const authState = useSelector(state => state.auth);
    const userState = useSelector(state => state.user);
    useEffect(() => {
        if (authState.user) {
          setUserValue(authState.user);
        //   dispatch(fetchUserData());
        }
      }, [authState]);

    useEffect(() => {
        if (userValue && userState.userData.length > 0) {
          const match = userState.userData.find(usr => usr.login_User == userValue.username);
          setTypeUser(match.type_User)
          setLoginUserName(match.login_User)
        }
      }, [userValue, userState])
      
    const checkAccess = ()=>{
        if (typeUser === "Super Admin") return true
        else if (typeUser === "Admin") return true
        else return false
      }

    //   ==============================================================
    const [duplicateError, setDuplicateError] = useState(false);
    //   ==============================================================

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
          const currentDate = new Date().toLocaleDateString();
          await dispatch(postProductData({
            ...formData
            // Date_Actualisation: currentDate,
            // Emplacement: formData.Emplacement, // Add this new property
          }));
        setFormData({
            Numéro_Article: "",
            Description_Article: "",
            Groupe_Articles: "",
            Actif: "",
            Designation_Fadesol:"",
            Gamme_Etiquette:"",
            Emplacement: "",
            qte_Magasin: "",
            // code_Barre: "", 
          });
          setOpenAddDialog(false);
          console.log('Before toast.success');
          toast.success('Product added successfully!', {
            position: toast.POSITION_TOP_RIGHT,
            autoClose: 3000,
          });
          console.log('After toast.success');
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

    // const handleEditChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedProduct((prevUser) => ({
    //         ...prevUser,
    //         [name]: value
    //     }));
    // };
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
                position: toast.POSITION_TOP_RIGHT,
                autoClose: 3000,
            });
            await dispatch(postTransactionData({
                Numéro_Article: editProduct.Numéro_Article,
                user_Dmd: loginUserName,
                Type_Transaction: "Update",
                qte_Edited: editedProduct.qte_Magasin - editProduct.qte_Magasin,
                qte_Magasin: editedProduct.qte_Magasin,
                qte_Old: editProduct.qte_Magasin,
            }))
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // const filteredProducts = productData ? productData.filter((product) => {
     
    //      return (
    //         (product.Numéro_Article && product.Numéro_Article.toLowerCase().includes(search.toLowerCase())) ||
    //         (product.Description_Article && product.Description_Article.toLowerCase().includes(search.toLowerCase())) ||
    //         (product.code_Barre && product.code_Barre.toLowerCase().includes(search.toLowerCase()))
    //     );
    // }) : [];

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

    // console.log("=>+>+>+>+>+>+>",filteredProducts.reverse())
    const [anchorEl, setAnchorEl] = useState(null);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(productData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        XLSX.writeFile(workbook, "products.xlsx");
        setAnchorEl(null);
    };

    const printData = () => {
        window.print();
        setAnchorEl(null);
    };


    const handleAddClick = () => {
        setOpenAddDialog(true);
    };

    const handleSearchChange = (event) => {
        // setSearch(event.target.value);
        const { value } = event.target;
        setSearch(value);
        setTabValue(0);
        setPage(0);
    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handleExpandUser = (user) => {
        if (expandedUser === user.id_Article) {
          setExpandedUser(null);
        } else {
          setExpandedUser(user.id_Article);
        }
      };
const handleDeleteProduct = () => {
    if (selectedProduct) {
        // Dispatch the 'deleteProductData' action with the correct ID property
        dispatch(deleteProductData(selectedProduct.id_Article));
    }
    // Close the delete dialog after successful deletion
    handleDeleteDialogClose();
    toast.success('Product deleted successfully!', {
        position: toast.POSITION_TOP_RIGHT,
        autoClose: 3000,
    });
};


const downloadQRCodeAsPDF = async (numArticle, Gamme, Designation, desi_fadesol) => {
    const canvas = document.getElementById(`qrCodeCanvas-${numArticle}`);
    if (canvas) {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'cm',
            format: [10, 6],
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        
        // Set smaller width for the barcode
        const contentWidth = 2; // Smaller width in cm
        const contentHeight = (imgProps.height * contentWidth) / imgProps.width; // Maintain aspect ratio

        pdf.addImage(imgData, 'PNG', 4, 4, contentWidth, contentHeight); // Position the image with margins
        
        pdf.setFontSize(14); // Smaller font size
        pdf.setFont("helvetica", "bold");
        pdf.text('Services', 6, 1.4, { align: 'center' });
        pdf.setFontSize(15);
        // Set font to bold for 'FADESOL'
        pdf.setFont("helvetica", "bold");
        pdf.text(`FADESOL`, 1, 1);
        pdf.setFontSize(10);
        // Reset font to normal
        pdf.setFont("helvetica", "normal");
        pdf.text(`UPS SYSTEMS`, 1, 1.5);


        pdf.setLineWidth(0.25); // Set line width
        pdf.line(1, 1.8, 3.5, 1.8); // Draw line from (1 cm, 2 cm) to (9 cm, 2 cm)
        
        pdf.setFont("helvetica", "bold");
        pdf.text('Pièce détachée d\'origine', 6, 2.3, { align: 'center' });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8); // Even smaller font size

        pdf.text(`: ${Gamme}`, 3, 2.8);
        pdf.text(`Gamme`, 1, 2.8);

        pdf.text(`: ${numArticle}`, 3, 3.1);
        pdf.text(`Références`, 1, 3.1);
        
        pdf.text(`: ${Designation}`, 3, 3.4);
        pdf.text(`Designation`, 1, 3.4);
        
        pdf.text(`: ${desi_fadesol}`, 3, 3.7);
        pdf.text(`Designation frn`, 1, 3.7);
        
        pdf.text(`Quantite`, 1, 4);
        pdf.text(`:`, 3, 4);

        pdf.save(`${numArticle}.pdf`);
    } else {
        console.error('Canvas for Barcode not found');
    }
};


// /==========================================================

const downloadBarcodeAsPDF = async (numArticle, Gamme, Designation, desi_fadesol) => {
    const canvas = document.getElementById(`barcodeCanvas-${numArticle}`);
    if (canvas) {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'cm',
            format: [10, 6],
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        console.log("imgProps==>", imgProps)
        // Set smaller width for the barcode
        const contentWidth = 5.5; // Smaller width in cm
        const contentHeight = (imgProps.height * contentWidth) / imgProps.width; // Maintain aspect ratio
        console.log("contentHeight==+>",contentHeight)
        pdf.addImage(imgData, 'PNG', 2.5, 4, contentWidth, 2); // Position the image with margins
        
        pdf.setFontSize(14); // Smaller font size
        pdf.setFont("helvetica", "bold");
        pdf.text('Services', 6, 1.4, { align: 'center' });
        // pdf.text('Victron Energy', 6, 1.4, { align: 'center' });
        // pdf.text('CyberPower', 6, 1.4, { align: 'center' });
        // pdf.text('Steca', 6, 1.4, { align: 'center' });
        pdf.setFontSize(15);
        // Set font to bold for 'FADESOL'
        pdf.setFont("helvetica", "bold");
        pdf.text(`FADESOL`, 1, 1);
        pdf.setFontSize(9.6);
        // Reset font to normal
        pdf.setFont("helvetica", "normal");
        // pdf.text(`Power Solutions`, 1, 1.5);
        pdf.text(`UPS SYSTEMS`, 1, 1.5);


        pdf.setLineWidth(0.25); // Set line width
        pdf.line(1, 1.8, 3.5, 1.8); // Draw line from (1 cm, 2 cm) to (9 cm, 2 cm)
        
        pdf.setFont("helvetica", "bold");
        pdf.text('Pièce détachée d\'origine', 6, 2.3, { align: 'center' });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8); // Even smaller font size

        pdf.text(`: ${Gamme}`, 3, 2.8);
        pdf.text(`Gamme`, 1, 2.8);

        pdf.text(`: ${numArticle}`, 3, 3.1);
        pdf.text(`Références`, 1, 3.1);
        
        pdf.text(`: ${Designation}`, 3, 3.4);
        pdf.text(`Designation`, 1, 3.4);
        
        pdf.text(`: ${desi_fadesol}`, 3, 3.7);
        pdf.text(`Designation frn`, 1, 3.7);
        
        pdf.text(`Quantite`, 1, 4);
        pdf.text(`:`, 3, 4);

        pdf.save(`${numArticle}.pdf`);
    } else {
        console.error('Canvas for Barcode not found');
    }
};

const downloadCombinedImage = async (numArticle, Gamme) => {
    const Designation = Gamme.Description_Article; // Extraction de la désignation
    const desi_fadesol = Gamme.Designation_Fadesol; // Extraction de la désignation fadesol

    console.log('numArticle:', numArticle);
    console.log('Gamme:', Gamme);
    console.log('Designation:', Designation);
    console.log('desi_fadesol:', desi_fadesol);

    const barcodeCanvas = document.getElementById(`barcodeCanvas-${numArticle}`);

    if (barcodeCanvas) {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'cm',
            format: [5, 3.4],
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        // Convert barcode canvas to image
        const barcodeImgData = barcodeCanvas.toDataURL('image/png');
        const barcodeImgProps = pdf.getImageProperties(barcodeImgData);
        const barcodeWidth = 4.9; // Smaller width in cm
        const barcodeHeight = (barcodeImgProps.height * barcodeWidth) / barcodeImgProps.width;

        // Add barcode image to PDF
        pdf.addImage(barcodeImgData, 'PNG', 0.05, 1.3, barcodeWidth, 2);

        pdf.setFontSize(12);
        // Set font to bold for 'FADESOL'
        pdf.setFont("helvetica", "bold");
        pdf.text('FADESOL', 0.2, 0.5);
        pdf.setFontSize(8);
        // Reset font to normal
        pdf.setFont("helvetica", "normal");
        pdf.text('UPS SYSTEMS', 0.2, 0.8);

        pdf.setLineWidth(0.16); // Set line width
        pdf.line(0.2, 1, 2.2, 1); // Draw line from (1 cm, 2 cm) to (9 cm, 2 cm)

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8); // Even smaller font size

        pdf.save(`${numArticle}.pdf`);
    } else {
        console.error('Canvas for Barcode or QR Code not found');
    }
};

// const handleDuplicate = (productId) => {
//     console.log('Duplicate productID:', productId);
//     dispatch(duplicateProductData(productId))
//       .then(() => {
//         // Optionally, you can handle success, such as showing a success message
//       })
//       .catch((err) => {
//         // Optionally, you can handle errors, such as showing an error message
//       });
//   };
        const handleDuplicate = (productId) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to duplicate this product?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, duplicate it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(duplicateProductData(productId))
                        .then(() => {
                            toast.success('Product duplicated successfully!', {
                                position: toast.POSITION_TOP_RIGHT,
                                autoClose: 3000,
                            });
                        })
                        .catch((err) => {
                            toast.error('Failed to duplicate product.', {
                                position: toast.POSITION_TOP_RIGHT,
                                autoClose: 3000,
                            });
                        });
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    toast.info('Product duplication canceled.', {
                        position: toast.POSITION_TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
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
                <TableContainer >
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox color="primary" />
                                </TableCell>
                                <TableCell>Numéro d'article</TableCell>
                                <TableCell>Désignation  Fournisseur</TableCell>
                                <TableCell>Groupe d'articles</TableCell>
                                <TableCell>Désignation  Fadesol </TableCell>
                                <TableCell>Gamme Etiquette </TableCell>
                                <TableCell>Disponibilité en Stock</TableCell>
                                <TableCell>Actif</TableCell>
                                <TableCell>Emplacement</TableCell>
                                {checkAccess() && 
                                    <TableCell align="center">Actions</TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {filteredProducts.reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                <>
                                    <TableRow key={product.id_Article}>
                                        <TableCell padding="checkbox">
                                            <Checkbox color="primary" />
                                        </TableCell>
                                        <TableCell>{product.Numéro_Article}</TableCell>
                                        <TableCell>{product.Description_Article}</TableCell>
                                        <TableCell>{product.Groupe_Articles}</TableCell>
                                        <TableCell>{product.Designation_Fadesol}</TableCell>
                                        <TableCell>{product.Gamme_Etiquette}</TableCell>
                                        <TableCell>{product.qte_Magasin}</TableCell>
                                        <TableCell>{product.Actif}</TableCell>
                                        <TableCell>{product.Emplacement}</TableCell>
                                        {checkAccess() && 
                                            <TableCell align="center">
                                                <div className='flex'>
                                                    <button
                                                        type="button"
                                                        className="text-gray-600 hover:text-gray-900 focus:outline-none px-1"
                                                        onClick={() => handleExpandUser(product)}
                                                        >
                                                        <GrView />
                                                        <path d="M10 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3m-4 8v4m0-8V6m4 8h3m2-3h-8"></path>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="text-green-600 hover:text-green-900 focus:outline-none"
                                                        onClick={() => handleOpenEditDialog(product)}>
                                                        <Edit/>
                                                    </button>

                                                    <button 
                                                        onClick={() => handleDuplicate(product.id_Article)}
                                                        className="text-gray-600 text-xl px-1 hover:text-gray-900 focus:outline-none"
                                                        >
                                                        <IoDuplicateOutline />
                                                    </button>
                                                    <button className='text-red-700' onClick={() => handleDeleteClick(product)}>
                                                        {/* <IconButton color="secondary" onClick={() => handleDeleteClick(product)}><Delete /></IconButton> */}
                                                        <Delete />
                                                    </button>
                                                </div>

                                            </TableCell>
                                        }
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={9} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                            <Collapse in={expandedUser === product.id_Article} timeout="auto" unmountOnExit>
                                                <Grid container spacing={2} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                                                    <Grid item xs={3}>
                                                        <Card>
                                                            <CardContent>
                                                                <Typography variant="h6">Product Details</Typography>
                                                                <Typography><strong>Numéro article: </strong>{product.Numéro_Article}</Typography>
                                                                <Typography><strong>Désignation  Fournisseur: </strong>{product.Description_Article}</Typography>
                                                                <Typography><strong>Groupe d'articles: </strong>{product.Groupe_Articles}</Typography>
                                                                <Typography><strong>Designation Fadesol: </strong>{product.Designation_Fadesol}</Typography>
                                                                <Typography><strong>Emplacement: </strong>{product.Emplacement}</Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Card>
                                                        <CardContent>
                                                                <Typography variant="subtitle1">Barcode</Typography>
                                                                <BarcodeCanvas value={product.code_Barre ? product.code_Barre : product.Numéro_Article} id={`barcodeCanvas-${product.Numéro_Article}`} />
                                                                <button 
                                                                    onClick={() => downloadBarcodeAsPDF(product.Numéro_Article, product.Gamme_Etiquette, product.Description_Article, product.Designation_Fadesol)} 
                                                                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                                                                >
                                                                    Download as PDF
                                                                </button>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Card>
                                                            <CardContent>
                                                                <Typography variant="subtitle1">QR+ Code</Typography>
                                                                <QRCode value={product.code_Barre ? product.code_Barre : product.Numéro_Article} id={`qrCodeCanvas-${product.Numéro_Article}`} />
                                                                                                {/* <Button variant="contained" color="primary" onClick={() => downloadQRCodeAsPDF(product.Numéro_Article)}>
                                                                                                    Download as PDF
                                                                                                </Button> */}
                                                                                            <button 
                                                                    onClick={() => downloadQRCodeAsPDF(product.Numéro_Article, product.Gamme_Etiquette, product.Description_Article, product.Designation_Fadesol)} 
                                                                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                                                                >
                                                                    Download as PDF
                                                                </button>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Card>
                                                            <CardContent>
                                                                <Typography variant="subtitle1">Mini Barcode</Typography>
                                                                <button 
                                                                    onClick={() => downloadCombinedImage(product.Numéro_Article, product)} 
                                                                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                                                                >
                                                                    Download PDF
                                                                </button>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 30, 50]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </TableContainer>

                {openDialog && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                                Edit Product
                                            </h3>
                                            <div className="mt-2">
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Numéro d'article"
                                                    name="Numéro_Article"
                                                    value={editedProduct.Numéro_Article}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Description Fournisseur"
                                                    name="Description_Article"
                                                    value={editedProduct.Description_Article}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Groupe d'articles"
                                                    name="Groupe_Articles"
                                                    value={editedProduct.Groupe_Articles}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Designation Fadesol"
                                                    name="Designation_Fadesol"
                                                    value={editedProduct.Designation_Fadesol}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    margin="normal"
                                                    name="Gamme_Etiquette"
                                                    label="Gamme Etiquette"
                                                    type="text"
                                                    fullWidth
                                                    value={editedProduct.Gamme_Etiquette}
                                                    onChange={handleEditChange}
                                                />
                                                <TextField
                                                    margin="normal"
                                                    name="Actif"
                                                    label="Actif"
                                                    type="text"
                                                    fullWidth
                                                    value={editedProduct.Actif}
                                                    onChange={handleEditChange}
                                                />
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Code Barre"
                                                    name="code_Barre"
                                                    value={editedProduct.code_Barre}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                    <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Emplacement"
                                                    name="Emplacement"
                                                    value={editedProduct.Emplacement}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                                    <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="QTE Magasin"
                                                    name="qte_Magasin"
                                                    value={editedProduct.qte_Magasin}
                                                    onChange={handleEditChange}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button onClick={handleSaveEdit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Save
                                    </button>
                                    <button onClick={handleCloseDialog} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                               
                <Dialog
                    open={openAddDialog}
                    onClose={() => setOpenAddDialog(false)}
                    >
                        <DialogTitle>Add New Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Please fill in the form to add a new product.
                        </DialogContentText>
                        <form>
                        <TextField
                            margin="dense"
                            name="Numéro_Article"
                            label="Numéro d'article"
                            type="text"
                            fullWidth
                            value={formData.Numéro_Article}
                            onChange={handlePostChange}
                        />
                        <TextField
                            margin="dense"
                            name="Description_Article"
                            label="Designation Fournisseur"
                            type="text"
                            fullWidth
                            value={formData.Description_Article}
                            onChange={handlePostChange}
                        />
                        <TextField
                            margin="dense"
                            name="Designation_Fadesol"
                            label="Designation fadesol"
                            type="text"
                            fullWidth
                            value={formData.Designation_Fadesol}
                            onChange={handlePostChange}
                        />
                        <TextField
                            margin="dense"
                            name="Gamme_Etiquette"
                            label="Gamme Etiquette"
                            type="text"
                            fullWidth
                            value={formData.Gamme_Etiquette}
                            onChange={handlePostChange}
                        />
                        <TextField
                            margin="dense"
                            name="Groupe_Articles"
                            label="Groupe d'articles"
                            type="text"
                            fullWidth
                            value={formData.Groupe_Articles}
                            onChange={handlePostChange}
                        />
                        <TextField
                            margin="dense"
                            name="Actif"
                            label="Actif"
                            type="text"
                            fullWidth
                            value={formData.Actif}
                            onChange={handlePostChange}
                        />
                        <TextField // Add this new field
                            margin="dense"
                            name="Emplacement"
                            label="Emplacement"
                            type="text"
                            fullWidth
                            value={formData.Emplacement}
                            onChange={handlePostChange}
                        />
                        <TextField // Add this new field
                            margin="dense"
                            name="code_Barre"
                            label="code Barre"
                            type="text"
                            fullWidth
                            value={formData.code_Barre}
                            onChange={handlePostChange}
                        />
                        <TextField 
                            margin="dense"
                            name="qte_Magasin"
                            label="Qte MAgasin"
                            type="text"
                            fullWidth
                            value={formData.qte_Magasin}
                            onChange={handlePostChange}
                        />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAddDialog(false)} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                        Add
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

                <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteProduct} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </Paper>
            <ToastContainer />
        </>
    );
};

export default ProductTable;