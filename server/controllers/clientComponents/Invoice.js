const React = require("react");
const {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} = require("@react-pdf/renderer");
const numeral = require("numeral");


const styles = StyleSheet.create({
  // (các style không thay đổi)
});



const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>INVOICE</Text>
        <View style={styles.section}>
          <Text style={styles.title}>Company Info</Text>
          <Text style={styles.companyInfo}>
            <Text>
              <Text style={styles.keyInfo}>Company Name:</Text> 2HS{"\n"}
            </Text>
            <Text>
              <Text style={styles.keyInfo}>Address:</Text> 01 Vo Van Ngan, Linh
              Chieu, Thu Duc, Ho Chi Minh City{"\n"}
            </Text>
            <Text>
              <Text style={styles.keyInfo}>Hotline:</Text> +84 973 711 868{"\n"}
            </Text>
            <Text>
              <Text style={styles.keyInfo}>Email:</Text> support@2hs.com
            </Text>
          </Text>
        </View>
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
            {order.products.map((product, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColHeaderContentNonHighlight}>
                  <Text style={styles.tableCellHeader}>
                    {product.product.title}
                  </Text>
                </View>
                <View style={styles.tableColHeaderContentHighlight}>
                  <Text style={styles.tableCellHeader}>
                    {numeral(product.product.price).format("0,0")} VND
                  </Text>
                </View>
                <View style={styles.tableColHeaderContentNonHighlight}>
                  <Text style={styles.tableCellHeader}>
                    {product.product.brand}
                  </Text>
                </View>
                <View style={styles.tableColHeaderContentHighlight}>
                  <Text style={styles.tableCellHeader}>
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
          <Text style={styles.title}>Total Amount:{"\n"}</Text>
          <Text style={styles.primary}>
            {numeral(order.paymentIntent.amount).format("0,0")} VND
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Payment Method:{"\n"}</Text>
          <Text style={styles.text}>{order.paymentIntent.status}</Text>
        </View>
        <Text style={styles.footer}>
          ~ Thank you for shopping at 2HS! ~{"\n"}
        </Text>
        <Text style={styles.notes}>
          If you have any questions, please contact us via email or phone number
          above.
        </Text>
      </Page>
    </Document>
  );
};

module.exports = Invoice;
