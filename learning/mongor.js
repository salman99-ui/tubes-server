var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mobil',{useNewUrlParser : true , useUnifiedTopology : true }).then(() => {
	console.log('koneksi berhasil');
}).catch(err => {
	console.log(err);
})

var mobilSchema = mongoose.Schema({  
    nama: String,
    merk: String,
    tahunPembuatan: Number,
    tanggalUpdate: Date,
    transmisi: {
        manual: Boolean,
        outomatic: Boolean
    }
});

var Mobil = mongoose.model('Mobil', mobilSchema);

/* create data
var lamborgini = new Mobil({  
    nama: 'Aventador',
    merk: 'Lamborgini',
    tahunPembuatan: 2015,
    tanggalUpdate: new Date(),
    transmisi: {
        manual: true,
        outomatic: false
    }
});

console.log(lamborgini);

lamborgini.save(function(err){
	if(err) {
		console.log(err);
	}else{
		console.log('berhasil menyimpan');
	}
});
*/
Mobil.find(function (err, mobils) {  
    if (err)
        return console.error(err);
    console.log(mobils);
});
