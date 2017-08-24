'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const Product = require('../app/models/product-model');
const server = require('../server')


describe('file exists', ()=>{
    it('Should exist product model file', ()=>{
        expect(Product).to.be.not.undefined;
    });

    it('Should exist server file', ()=>{
        expect(server).to.be.not.undefined;
    });
});

describe('products', ()=>{
    beforeEach((done)=>{
        Product.remove({}, (err)=>{
            done();
        });
    });

    describe('/POST product', () => {

        it('it should not POST a book without name field', (done) => {
            let newProduct = {
                price: 6,
                description: 'para la madera'}
            chai.request(server)
                .post('/api/product')
                .send(newProduct)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('kind').eql('required');
                done();
                });
        });

        it('it should POST a product ', (done) => {
            let newProduct = {
                name: 'linterna',
                price: 6,
                description: 'para la madera',
                createdAt: Date.now}
            chai.request(server)
                .post('/api/product')
                .send(newProduct)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('productNew');
                    res.body.should.have.property('message');
                    res.body.productNew.should.have.property('name');
                done();
                });
        });
        });
});