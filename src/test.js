let result = "DCT-"
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
for ( var i = 0; i < 3; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
console.log(result)