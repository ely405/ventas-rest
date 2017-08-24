'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const Product = require('../app/models/product-model');
const server = require('../server');


describe('GET api/product', ()=>{
    beforeEach(done=>{
        Product.remove({}, err=>{
            done();
        });
    });

    it('Should get all products', done=>{
        chai.request(server)
            .get('/api/product')
            .end((err, res)=>{
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.allProducts.length.should.be.eql(0);
                done();
            })
    });
});

describe('GET api/product/id', ()=>{
    beforeEach(done=>{
        Product.remove({}, err=>{
            done();
        });
    });

    // it('show product by id', ()=>{

    //     let productToList = new Product({
    //         name: 'alambre',
    //         price: 5,
    //         descripcion: 'alambre antióxido'
    //     });

    //     productToList.save((err, prod)=>{
    //         // console.log(prod)
    //         chai.request(server)
    //             .get('/api/product/' + prod.id)
    //             .end((err, res)=>{
    //                 res.status.should.equal(200);
    //             });
    //     });
    // })
});