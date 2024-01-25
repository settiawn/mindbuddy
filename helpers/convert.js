function convertPrice(value){
    return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
    });
}

module.exports = {convertPrice};