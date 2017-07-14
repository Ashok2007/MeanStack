var Customer = require('../models/customer');
var express = require('express');

var router = express.Router();

function errorHandler(res, reason, message, code){
    console.log('Error : ' + reason);
    res.status(code || 500).json({ error: message});
};

//api/customer
router.route('/customer')
    .get(function(req, res){        
        Customer.find(function(err, result){
            if(err){
                errorHandler(res, res.message, 'faild to get customers.')
            }
            res.status(200).json(result);
        });
    })
    .post(function(req, res){
        if(!req.body.firstName){
            errorHandler(res, 'Invaild user input', 'first name is required', 400);
        }
        var customer = new Customer(req.body);

        customer.save(function(err, result,numAffected){
            if(err){
                errorHandler(res, err.message, 'faild to create a customer.')
            }

            res.status(201).json(result);
        });
    });


//api/customer/:firstname
router.route('/customer/:firstName')
.get(function(req, res){ 
    var filterCustomer = { firstName : req.params.firstName };
    Customer.findOne(filterCustomer, function(err, result){
         if(err){
                errorHandler(res, err.message, 'faild to get a customer.')
            }

            res.status(200).json(result);
    });
    /*Customer.find(filterCustomer, function(err, result){
         if(err){
                errorHandler(res, err.message, 'faild to get a customer.')
            }

            res.status(200).json(result);
    });*/
})
.put(function(req, res){
    var filterCustomer = { firstName: req.params.firstName };
    var updateData = req.body;

   Customer.update(filterCustomer, updateData, function(err, result){
        if(err){
            errorHandler(res, err.message, 'faild to update a customer.');
        }
        res.status(200).json(result);
    });

  /*  Customer.updateMany(filterCustomer, updateData, function(err, result){
        if(err){
            errorHandler(res, err.message, 'faild to update a customer.');
        }
        res.status(200).json(result);
    });*/
})
.delete(function(req, res){
    var filterCustomer = { firstName : req.params.firstName };
    Customer.remove(filterCustomer, function(err, result){
        if(err){
            errorHandler(res, err.message, 'faild to delete a customer.');
        }
        res.status(200).json(result);
    });
});

//api/customer/:id
router.route('/deletecustomer/:id')
.delete(function(req, res){
    var filterCustomer = { _id : req.params.id };
    Customer.remove(filterCustomer, function(err, result){
        if(err){
            errorHandler(res, err.message, 'faild to delete a customer.');
        }
        res.status(200).json(result);
    });
})

module.exports = router;