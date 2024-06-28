import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import numeral from 'numeral';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        marginVertical: 10,
    },
    header: {
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#281714',
    },
    companyInfo: {
        fontSize: 12,
        marginBottom: 10,
        color: '#281714',
    },
    keyInfo: {
        fontSize: 12,
        marginBottom: 10,
        color: '#5d403b',
    },
    customerInfo: {
        fontSize: 12,
        marginBottom: 10,
    },
    title: {
        fontSize: 13,
        marginBottom: 10,
        fontWeight: 500,
        color: '#281714',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        verticalAlign: 'middle',
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#E4E4E4',
        padding: 5,
    },
    tableCol: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableCellHeader: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    tableColHeaderContentHighlight: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#8c611280',
        color: '#ffffff',
        padding: 5,
    },
    tableColHeaderContentNonHighlight: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#ffffff',
        color: '#281714',
        padding: 5,
    },
    tableCell: {
        fontSize: 10,
    },
    total: {
        fontSize: 12,
        marginTop: 10,
    },
    paymentMethod: {
        fontSize: 12,
        marginTop: 10,
    },
    notes: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
        color: '#5d403b',
    },
    primary: { fontSize: 12, color: '#8f0000' },
    text: { fontSize: 12, color: '#281714' },
    footer: {
        paddingTop: '100px',
        paddingHorizontal: '100px',
        fontSize: 12,
        textAlign: 'center',
        color: '#8f0000',
        backgroundImage: '-webkit-linear-gradient(0deg, #8f0000 0%, #a7382a 50%, #603f00 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textFillColor: 'transparent',
    },
});

const Invoice = ({ order }) => {
    console.log(order);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>INVOICE</Text>

                <View style={styles.section}>
                    <Text style={styles.title}>Company Info</Text>
                    <Text style={styles.companyInfo}>
                        <Text>
                            <Text style={styles.keyInfo}>Company Name:</Text> 2HS{'\n'}
                        </Text>
                        <Text>
                            <Text style={styles.keyInfo}>Address:</Text> 01 Vo Van Ngan, Linh Chieu, Thu Duc, Ho Chi
                            Minh City{'\n'}
                        </Text>
                        <Text>
                            <Text style={styles.keyInfo}>Hotline:</Text> +84 973 711 868{'\n'}
                        </Text>
                        <Text>
                            <Text style={styles.keyInfo}>Email:</Text> support@2hs.com
                        </Text>
                    </Text>
                </View>
                {/* 
                <View style={styles.section}>
                    <Text style={styles.customerInfo}>
                        <Text>Customer Name: John Doe{'\n'}</Text>
                        <Text>Address: 456 XYZ Street, District 3, Ho Chi Minh City{'\n'}</Text>
                        <Text>Phone Number: +84 987 654 321{'\n'}</Text>
                        <Text>Email: johndoe@example.com</Text>
                    </Text>
                </View> */}

                <View style={styles.section}>
                    <Text style={styles.title}>Order Details:</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Title</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Price</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Brand</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Size</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Quantity</Text>
                            </View>
                        </View>

                        {order.products.map((product) => (
                            <View style={styles.tableRow}>
                                <View style={styles.tableColHeaderContentNonHighlight}>
                                    <Text style={styles.tableCellHeader}>{product.product.title}</Text>
                                </View>
                                <View style={styles.tableColHeaderContentHighlight}>
                                    <Text
                                        style={styles.tableCellHeader}
                                        className="bg-light-tertiary-container/50 text-light-on-primary-container"
                                    >
                                        {numeral(product.product.price).format('0,0')} VND
                                    </Text>
                                </View>
                                <View style={styles.tableColHeaderContentNonHighlight}>
                                    <Text style={styles.tableCellHeader}>{product.product.brand}</Text>
                                </View>
                                <View style={styles.tableColHeaderContentHighlight}>
                                    <Text
                                        style={styles.tableCellHeader}
                                        className="bg-light-tertiary-container/50 text-light-on-primary-container"
                                    >
                                        {product.product.size}
                                    </Text>
                                </View>
                                <View style={styles.tableColHeaderContentNonHighlight}>
                                    <Text style={styles.tableCellHeader}>{product.count}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Total Amount:{'\n'}</Text>
                    <Text style={styles.primary}>{numeral(order.paymentIntent.amount).format('0,0')} VND</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Payment Method:{'\n'}</Text>
                    <Text style={styles.text}>{order.paymentIntent.status}</Text>
                </View>
                <Text style={styles.footer}>~ Thank you for shopping at 2HS! ~{'\n'}</Text>
                <Text style={styles.notes}>
                    If you have any questions, please contact us via email or phone number above.
                </Text>
            </Page>
        </Document>
    );
};

export default Invoice;
