'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const Product = require('../app/models/product-model');
const server = require('../server');

describe('DELETE api/product', ()=>{
    beforeEach(done=>{
        Product.remove({}, err=>{
            done();
        });
    });

    it('should delete a product given the ID', done=>{
        let product = new Product({
            name: 'pintura',
            price: 13,
            description: 'Pitntura lavable'
        });

        product.save((err, prod)=>{
            chai.request(server)
                .delete('/api/product/' + prod.id)
                .end((err, res)=>{
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('El producto ha sido eliminado');
                    // res.body.result.should.have.property('ok').eql(1);
                    // res.body.result.should.have.property('n').eql(1);
                    done();
                });
        });
    });
});