'use strict';

process.env.NODE_ENV = 'test';


const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const Product = require('../app/models/product-model');
const server = require('../server');

describe('/PUT/:id', () => {

    beforeEach((done)=>{
        Product.remove({}, (err)=>{
            done();
        });
    });

    it('it should UPDATE a product given the id', (done) => {
    let productToUpdate = new Product({
                name: 'cemento',
                price: 18,
                description: 'bolsa negra'
    });

    productToUpdate.save((err, product) => {
            console.log(product);
            chai.request(server)
            .put('/api/product/' + product.id)
            .send({name: "cemento", price: 25, description: 'bolsa azul'})
            .end((err, res) => {
                console.log(res.body)
                res.status.should.equal(200);
                // res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Product updated!');
                res.body.productUpdated.should.have.property('description').eql('bolsa azul');
                res.body.productUpdated.should.have.property('price').eql(25);
                done();
            });
        });
    });
});
